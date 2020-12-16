import ok from "assert";
import { Job } from "kubernetes-models/batch/v1/Job";
import { EnvFromSource } from "kubernetes-models/v1/EnvFromSource";
import type { EnvVar } from "kubernetes-models/v1/EnvVar";

interface RestoreDbJobArgs {
  project: string;
  env: EnvVar[];
  envFrom?: EnvFromSource[];
}

// renovate: datasource=docker depName=registry.gitlab.factory.social.gouv.fr/socialgouv/docker/azure-db versioning=2.6.1
const SOCIALGOUV_DOCKER_AZURE_DB = "2.6.1";

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
  --no-owner \
  --role \${OWNER} \
  --no-acl \
  --verbose \
  \${DUMP};

psql -v ON_ERROR_STOP=1 \${PGDATABASE} -c "ALTER SCHEMA public owner to \${OWNER};"

`;

const getProjectSecretNamespace = (project: string) => `${project}-secret`;

const getAzureProdVolumeSecretName = (project: string) =>
  `azure-${project.replace(/-/g, "")}prod-volume`;

const getAzureBackupShareName = (project: string) =>
  `${project}-backup-restore`;

export const restoreDbJob = ({
  project,
  env = [],
  envFrom = [],
}: RestoreDbJobArgs): Job => {
  ok(process.env.CI_COMMIT_SHORT_SHA);
  const secretNamespace = getProjectSecretNamespace(project);
  const azureSecretName = getAzureProdVolumeSecretName(project);
  const azureShareName = getAzureBackupShareName(project);

  return new Job({
    metadata: {
      name: `restore-db-${process.env.CI_COMMIT_SHORT_SHA}`,
      namespace: secretNamespace,
    },
    spec: {
      backoffLimit: 0,
      template: {
        metadata: {},
        spec: {
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
              image: `registry.gitlab.factory.social.gouv.fr/socialgouv/docker/azure-db:${SOCIALGOUV_DOCKER_AZURE_DB}`,
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
        },
      },
    },
  });
};
