import ci from "@socialgouv/kosko-charts/environments";
import type { CIEnv } from "@socialgouv/kosko-charts/types";
import { waitForPostgres } from "@socialgouv/kosko-charts/utils";
import { generate } from "@socialgouv/kosko-charts/utils/environmentSlug";
import { updateMetadata } from "@socialgouv/kosko-charts/utils/updateMetadata";
import { ok } from "assert";
import type { IObjectMeta } from "kubernetes-models/apimachinery/pkg/apis/meta/v1";
import { Job } from "kubernetes-models/batch/v1";
import type { IVolumeMount } from "kubernetes-models/v1";
import {
  AzureFilePersistentVolumeSource,
  ConfigMap,
  Container,
  Volume,
  VolumeMount,
} from "kubernetes-models/v1";

import { azureProjectVolume } from "../azure-storage/azureProjectVolume";
import { autodevopsPgUserParams } from ".";
import type { PgParams } from "./types";

const SOCIALGOUV_DOCKER_IMAGE = "ghcr.io/socialgouv/docker/azure-db";
// renovate: datasource=docker depName=ghcr.io/socialgouv/docker/azure-db versioning=6.45.0
const SOCIALGOUV_DOCKER_VERSION = "6.45.0";

const restoreScript = `
echo "starting restore into $PGHOST/$PGDATABASE"
[ ! -z $PGDATABASE ] || (echo "No PGDATABASE"; exit 1)
[ ! -z $PGHOST ] || (echo "No PGHOST"; exit 1)
[ ! -z $PGUSER ] || (echo "No PGUSER"; exit 1)
[ ! -z $PGPASSWORD ] || (echo "No PGPASSWORD"; exit 1)
[ ! -z $OWNER ] || (echo "No OWNER"; exit 1)
# get latest backup folder
LATEST=$(ls -1Fr /mnt/data | head -n 1);
DUMP="/mnt/data/\${LATEST}\${FILE}"
echo "Restore \${DUMP} into \${PGDATABASE}";
pg_isready;
pg_restore \
  --dbname \${PGDATABASE} \
  --clean --if-exists \
  --exclude-schema=audit \
  --no-owner \
  --role \${OWNER} \
  --no-acl \
  --verbose \
  \${DUMP};
psql -v ON_ERROR_STOP=1 \${PGDATABASE} -c "ALTER SCHEMA public owner to \${OWNER};"
[ -f "/mnt/scripts/post-restore.sql" ] && psql -v ON_ERROR_STOP=1 -a < /mnt/scripts/post-restore.sql
`;

interface RestoreDbJobArgs {
  project: string;

  postRestoreScript?: string;
}

export const restoreDbFromAzureBackup = (
  name: string,
  { postRestoreScript, project }: RestoreDbJobArgs
): { metadata?: IObjectMeta; kind: string }[] => {
  const env = ci(process.env);
  const jobName = generate(`restore-db-${name}`);
  const backupsVolume = new Volume({
    name: "backups",
  });
  const dataMount = new VolumeMount({
    mountPath: "/mnt/data",
    name: backupsVolume.name,
  });
  const { pvc, pv } = azureBackupVolume(env, project);
  const {
    configMap: postRestoreScriptConfigMap,
    volume: postRestoreScriptVolume,
    volumeMount: postRestoreScriptVolumeMount,
  } = createPostRestoreScript(env, postRestoreScript);

  const scriptContainer = restoreScriptContainer(
    dataMount,
    postRestoreScriptVolumeMount
  );

  const currentBranchParams = autodevopsPgUserParams(env.branchSlug);

  const restoreJob = new Job({
    metadata: {
      annotations: {
        "kapp.k14s.io/update-strategy": "skip",
      },
      labels: {
        component: "restore-db",
        ...env.metadata.labels,
      },
      name: jobName,
      namespace: env.productionNamespace,
    },
    spec: {
      backoffLimit: 0,
      template: {
        metadata: {
          annotations: {
            "kapp.k14s.io/deploy-logs": "for-new-or-existing",
          },
        },
        spec: {
          containers: [scriptContainer],
          initContainers: [waitForPostgresContainer(currentBranchParams)],
          restartPolicy: "OnFailure",
          volumes: [
            backupsVolume,
            ...(postRestoreScriptVolume ? [postRestoreScriptVolume] : []),
          ],
        },
      },
      ttlSecondsAfterFinished: 86400,
    },
  });

  return [
    restoreJob,
    pvc,
    pv,
    ...(postRestoreScriptConfigMap ? [postRestoreScriptConfigMap] : []),
  ];
};

//

function restoreScriptContainer(
  dataMount: IVolumeMount,
  postRestoreScriptVolumeMount?: IVolumeMount
) {
  return new Container({
    command: ["sh", "-c", restoreScript],
    envFrom: [
      {
        secretRef: {
          name: "azure-pg-admin-user-dev",
        },
      },
    ],
    image: `${SOCIALGOUV_DOCKER_IMAGE}:${SOCIALGOUV_DOCKER_VERSION}`,
    imagePullPolicy: "IfNotPresent",
    name: "restore-db",
    resources: {
      limits: {
        cpu: "300m",
        memory: "512Mi",
      },
      requests: {
        cpu: "100m",
        memory: "64Mi",
      },
    },
    volumeMounts: [
      dataMount,
      ...(postRestoreScriptVolumeMount ? [postRestoreScriptVolumeMount] : []),
    ],
    workingDir: dataMount.mountPath,
  });
}

function waitForPostgresContainer(pgParams: PgParams) {
  const defaultContainer = waitForPostgres({
    secretRefName: "none",
  });
  return new Container({
    ...defaultContainer,
    env: [
      {
        name: "PGHOST",
        value: pgParams.host,
      },
      {
        name: "PGDATABASE",
        value: pgParams.database,
      },
      {
        name: "PGPASSWORD",
        value: pgParams.password,
      },
      {
        name: "PGUSER",
        value: `${pgParams.user}@${pgParams.host}`,
      },
      {
        name: "PGSSLMODE",
        value: "require",
      },
    ],
    envFrom: [],
  });
}

function azureBackupVolume(env: CIEnv, project: string) {
  const azureFileShareName = `${project}-backup-restore`;
  const [pvc, pv] = azureProjectVolume(azureFileShareName, {
    azureFile: new AzureFilePersistentVolumeSource({
      secretName: env.productionNamespace,
      shareName: `${project.replace(/-/g, "")}prodserver-backup-restore`,
    }),
    storage: "128Gi",
  });
  updateMetadata(pv, { namespace: { name: env.productionNamespace } });
  updateMetadata(pvc, { namespace: { name: env.productionNamespace } });
  ok(pvc.metadata?.name, "Missing pvc.metadata.name");
  ok(pv.metadata?.name, "Missing pv.metadata.name");

  // NOTE(douglasduteil): lock the pvc and the pc on the existing secret prod namepace
  ok(pv.spec?.azureFile, "Missing pv.spec?.azureFile");
  pvc.metadata.name = azureFileShareName;
  pv.spec.azureFile.secretNamespace = env.productionNamespace;
  pv.spec.azureFile.secretName = `azure-${project.replace(
    /-/g,
    ""
  )}prod-volume`;

  const volume = new Volume({
    name: "backups",
    persistentVolumeClaim: {
      claimName: pvc.metadata.name,
      readOnly: true,
    },
  });

  return { pv, pvc, volume };
}
function createPostRestoreScript(env: CIEnv, script?: string) {
  if (!script) {
    return {};
  }

  const configMapName = generate(`post-restore-script-configmap-${env.branch}`);
  const configMap = new ConfigMap({
    data: {
      "post-restore.sql": script,
    },
    metadata: {
      name: configMapName,
      namespace: env.productionNamespace,
    },
  });

  const volume = new Volume({
    configMap: {
      name: configMapName,
    },
    name: "scripts",
  });

  const volumeMount = new VolumeMount({
    mountPath: "/mnt/scripts",
    name: volume.name,
  });

  return { configMap, volume, volumeMount };
}
