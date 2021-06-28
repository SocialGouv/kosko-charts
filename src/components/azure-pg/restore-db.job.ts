import { getDefaultPgParams } from "@socialgouv/kosko-charts/components/azure-pg";
import { azureProjectVolume } from "@socialgouv/kosko-charts/components/azure-storage/azureProjectVolume";
import { addInitContainer } from "@socialgouv/kosko-charts/utils/addInitContainer";
import { waitForPostgres } from "@socialgouv/kosko-charts/utils/waitForPostgres";
import ok from "assert";
import type { IObjectMeta } from "kubernetes-models/apimachinery/pkg/apis/meta/v1";
import { Job } from "kubernetes-models/batch/v1";
import type { EnvVar } from "kubernetes-models/v1";
import {
  ConfigMap,
  EnvFromSource,
  Volume,
  VolumeMount,
} from "kubernetes-models/v1";

interface RestoreDbJobArgs {
  project: string;
  env: EnvVar[];
  envFrom?: EnvFromSource[];
  postRestoreScript?: string;
}

const SOCIALGOUV_DOCKER_IMAGE = "ghcr.io/socialgouv/docker/azure-db";
// renovate: datasource=docker depName=ghcr.io/socialgouv/docker/azure-db versioning=6.26.2
const SOCIALGOUV_DOCKER_VERSION = "6.26.2";

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

const getProjectSecretNamespace = (project: string) => `${project}-secret`;

export const restoreDbJob = ({
  project,
  env = [],
  envFrom = [],
  postRestoreScript,
}: RestoreDbJobArgs): { metadata?: IObjectMeta; kind: string }[] => {
  ok(process.env.CI_COMMIT_SHORT_SHA);
  ok(process.env.CI_JOB_ID);
  const secretNamespace = getProjectSecretNamespace(project);
  const [pvc, pv] = azureProjectVolume(`${project}-backup-restore`, {
    storage: "128Gi",
  });
  ok(pvc.metadata?.name, "Missing pvc.metadata.name");
  ok(pv.metadata?.name, "Missing pv.metadata.name");

  // NOTE(douglasduteil): lock the pvc and the pc on the existing secret prod namepace
  ok(pv.spec?.azureFile, "Missing pv.spec?.azureFile");
  pvc.metadata.name = `restore-db-${process.env.CI_JOB_ID}-backup-restore`;
  pvc.metadata.namespace =
    pv.metadata.namespace =
    pv.spec.azureFile.secretNamespace =
      secretNamespace;
  pv.spec.azureFile.secretName = "azure-cdtnadmindev-volume";

  const backupsVolume = new Volume({
    name: "backups",
    persistentVolumeClaim: {
      claimName: pvc.metadata.name,
      readOnly: true,
    },
  });
  const manifests = [];

  const jobSpec = {
    containers: [
      {
        command: ["sh", "-c", restoreScript],
        env,
        envFrom: [
          new EnvFromSource({
            secretRef: {
              name: "azure-pg-admin-user-dev",
            },
          }),
          ...envFrom,
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
          {
            mountPath: "/mnt/data",
            name: backupsVolume.name,
          },
        ],
      },
    ],
    restartPolicy: "OnFailure",
    volumes: [backupsVolume],
  };

  if (postRestoreScript) {
    const name = "scripts";
    jobSpec.containers[0].volumeMounts.push(
      new VolumeMount({
        mountPath: "/mnt/scripts",
        name,
      })
    );
    jobSpec.volumes.push(
      new Volume({
        configMap: {
          name: `post-restore-script-configmap-${process.env.CI_COMMIT_SHORT_SHA}`,
        },
        name,
      })
    );
    const configMap = new ConfigMap({
      data: {
        "post-restore.sql": postRestoreScript,
      },
      metadata: {
        name: `post-restore-script-configmap-${process.env.CI_COMMIT_SHORT_SHA}`,
        namespace: secretNamespace,
      },
    });
    manifests.push(configMap);
  }

  const job = new Job({
    metadata: {
      name: `restore-db-${process.env.CI_JOB_ID}`,
      namespace: secretNamespace,
    },
    spec: {
      backoffLimit: 0,
      template: {
        metadata: {},
        spec: jobSpec,
      },
      ttlSecondsAfterFinished: 86400,
    },
  });

  const initContainer = waitForPostgres({
    secretRefName: "azure-pg-admin-user-dev",
  });

  initContainer.envFrom = [];
  const defaultParams = getDefaultPgParams();
  initContainer.env = [
    {
      name: "PGHOST",
      value: defaultParams.host,
    },
    {
      name: "PGDATABASE",
      value: defaultParams.database,
    },
    {
      name: "PGPASSWORD",
      value: defaultParams.password,
    },
    {
      name: "PGUSER",
      value: `${defaultParams.user}@${defaultParams.host}`,
    },
    {
      name: "PGSSLMODE",
      value: "require",
    },
  ];

  addInitContainer(job, initContainer);

  manifests.push(job);
  manifests.push(pvc);
  manifests.push(pv);

  return manifests;
};
