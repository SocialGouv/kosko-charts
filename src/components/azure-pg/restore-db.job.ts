import { getDefaultPgParams } from "@socialgouv/kosko-charts/components/azure-pg";
import { azureProjectVolume } from "@socialgouv/kosko-charts/components/azure-storage/azureProjectVolume";
import environments from "@socialgouv/kosko-charts/environments";
import { addInitContainer } from "@socialgouv/kosko-charts/utils/addInitContainer";
import { generate } from "@socialgouv/kosko-charts/utils/environmentSlug";
import { waitForPostgres } from "@socialgouv/kosko-charts/utils/waitForPostgres";
import ok from "assert";
import { readFileSync } from "fs";
import type { IObjectMeta } from "kubernetes-models/apimachinery/pkg/apis/meta/v1";
import { Job } from "kubernetes-models/batch/v1";
import type { EnvVar } from "kubernetes-models/v1";
import {
  ConfigMap,
  EnvFromSource,
  Volume,
  VolumeMount,
} from "kubernetes-models/v1";
import { join } from "path";

interface RestoreDbJobArgs {
  project: string;
  env: EnvVar[];
  envFrom?: EnvFromSource[];
  postRestoreScript?: string;
}

const SOCIALGOUV_DOCKER_IMAGE = "ghcr.io/socialgouv/docker/azure-db";
// renovate: datasource=docker depName=ghcr.io/socialgouv/docker/azure-db versioning=6.45.0
const SOCIALGOUV_DOCKER_VERSION = "6.45.0";

const restoreScript = readFileSync(
  join(__dirname, "./restore-db-script.sh"),
  "utf8"
);

const getProjectSecretNamespace = (project: string) => `${project}-secret`;
const getAzureProdVolumeSecretName = (project: string) =>
  `azure-${project.replace(/-/g, "")}prod-volume`;

export const restoreDbJob = ({
  project,
  env = [],
  envFrom = [],
  postRestoreScript,
}: RestoreDbJobArgs): { metadata?: IObjectMeta; kind: string }[] => {
  const ciEnv = environments(process.env);
  const secretNamespace = getProjectSecretNamespace(project);
  const azureSecretName = getAzureProdVolumeSecretName(project);
  const azureFileShareName = `${project}-backup-restore`;
  const [pvc, pv] = azureProjectVolume(azureFileShareName, {
    storage: "128Gi",
  });
  ok(pvc.metadata?.name, "Missing pvc.metadata.name");
  ok(pv.metadata?.name, "Missing pv.metadata.name");

  // NOTE(douglasduteil): lock the pvc and the pc on the existing secret prod namepace
  ok(pv.spec?.azureFile, "Missing pv.spec?.azureFile");
  pvc.metadata.name = azureFileShareName;
  pvc.metadata.namespace = secretNamespace;
  pv.metadata.namespace = pv.spec.azureFile.secretNamespace = secretNamespace;
  pv.spec.azureFile.secretName = azureSecretName;

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
    const configMapName = generate(
      `post-restore-script-configmap-${ciEnv.branch}`
    );
    jobSpec.containers[0].volumeMounts.push(
      new VolumeMount({
        mountPath: "/mnt/scripts",
        name,
      })
    );
    jobSpec.volumes.push(
      new Volume({
        configMap: {
          name: configMapName,
        },
        name,
      })
    );
    const configMap = new ConfigMap({
      data: {
        "post-restore.sql": postRestoreScript,
      },
      metadata: {
        name: configMapName,
        namespace: secretNamespace,
      },
    });
    manifests.push(configMap);
  }

  const jobName = generate(`restore-db-${ciEnv.branch}`);
  const job = new Job({
    metadata: {
      annotations: {
        "kapp.k14s.io/update-strategy": "skip",
      },
      labels: {
        component: "restore-db",
        ...ciEnv.metadata.labels,
      },
      name: jobName,
      namespace: secretNamespace,
    },
    spec: {
      backoffLimit: 0,
      template: {
        metadata: {
          annotations: {
            "kapp.k14s.io/deploy-logs": "for-new-or-existing",
          },
        },
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
