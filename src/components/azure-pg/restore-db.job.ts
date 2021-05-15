import { getDefaultPgParams } from "@socialgouv/kosko-charts/components/azure-pg";
import { addInitContainer } from "@socialgouv/kosko-charts/utils/addInitContainer";
import { waitForPostgres } from "@socialgouv/kosko-charts/utils/waitForPostgres";
import ok from "assert";
import { ConfigMap } from "kubernetes-models/_definitions/IoK8sApiCoreV1ConfigMap";
import { Job } from "kubernetes-models/batch/v1/Job";
import { EnvFromSource } from "kubernetes-models/v1/EnvFromSource";
import type { EnvVar } from "kubernetes-models/v1/EnvVar";

interface RestoreDbJobArgs {
  project: string;
  env: EnvVar[];
  envFrom?: EnvFromSource[];
  postRestoreScript?: string;
}

const SOCIALGOUV_DOCKER_IMAGE = "ghcr.io/socialgouv/docker/azure-db";
// renovate: datasource=docker depName=ghcr.io/socialgouv/docker/azure-db versioning=6.0.1
const SOCIALGOUV_DOCKER_VERSION = "6.0.1";

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

const getAzureProdVolumeSecretName = (project: string) =>
  `azure-${project.replace(/-/g, "")}prod-volume`;

const getAzureBackupShareName = (project: string) =>
  `${project}-backup-restore`;

type Manifest = ConfigMap | Job;

export const restoreDbJob = ({
  project,
  env = [],
  envFrom = [],
  postRestoreScript,
}: RestoreDbJobArgs): Manifest[] => {
  ok(process.env.GITHUB_SHA)
  const sha = process.env.GITHUB_SHA?.slice(0,7)
  ok(sha);
  const secretNamespace = getProjectSecretNamespace(project);
  const azureSecretName = getAzureProdVolumeSecretName(project);
  const azureShareName = getAzureBackupShareName(project);

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
            name: "backups",
          },
        ],
      },
    ],
    restartPolicy: "OnFailure",
    volumes: [
      {
        azureFile: {
          readOnly: true,
          secretName: azureSecretName,
          shareName: azureShareName,
        },
        name: "backups",
      },
    ],
  };

  if (postRestoreScript) {
    jobSpec.containers[0].volumeMounts.push({
      mountPath: "/mnt/scripts",
      name: "scripts",
    });
    jobSpec.volumes.push({
      //@ts-expect-error
      configMap: {
        name: `post-restore-script-configmap-${sha}`,
      },

      name: "scripts",
    });
    const configMap = new ConfigMap({
      data: {
        "post-restore.sql": postRestoreScript,
      },
      metadata: {
        name: `post-restore-script-configmap-${sha}`,
        namespace: secretNamespace,
      },
    });
    manifests.push(configMap);
  }

  const job = new Job({
    metadata: {
      name: `restore-db-${process.env.GITHUB_JOB}`,
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

  return manifests;
};
