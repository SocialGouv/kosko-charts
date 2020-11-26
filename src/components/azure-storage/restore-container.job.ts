import ok from "assert";
import { Job } from "kubernetes-models/batch/v1/Job";
import { EnvFromSource } from "kubernetes-models/v1/EnvFromSource";
import { EnvVar } from "kubernetes-models/v1/EnvVar";

interface RestoreDbJobArgs {
  project: string;
  env: EnvVar[];
  envFrom?: EnvFromSource[];
}

const getProjectSecretNamespace = (project: string) => `${project}-secret`;

const restoreScript = `

echo "starting restore container $SOURCE_CONTAINER into $DESTINATION_CONTAINER"

# copy container
az storage copy -r \
   --source-connection-string "$SOURCE_CONNECTION_STRING" \
   --source-container "$SOURCE_CONTAINER" \
   --connection-string "$DESTINATION_CONNECTION_STRING" \
   --destination-container "$DESTINATION_CONTAINER"

# get original permission
PUBLIC_ACCESS=\`az storage container show-permission \
  --connection-string $SOURCE_CONNECTION_STRING \
  --name $SOURCE_CONTAINER | jq -r ".publicAccess"\`

# set original permission
az storage container set-permission \
  --name $DESTINATION_CONTAINER \
  --connection-string $DESTINATION_CONNECTION_STRING \
  --public-access $PUBLIC_ACCESS
`;

export const restoreContainerJob = ({
  project,
  env = [],
  envFrom = [],
}: RestoreDbJobArgs): Job => {
  ok(process.env.CI_COMMIT_SHORT_SHA);
  const secretNamespace = getProjectSecretNamespace(project);

  return new Job({
    metadata: {
      name: `restore-container-${process.env.CI_COMMIT_SHORT_SHA}`,
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
              envFrom,
              image: "mcr.microsoft.com/azure-cli:2.15.1",
              imagePullPolicy: "IfNotPresent",
              name: "restore-db",
              resources: {
                limits: {
                  cpu: "300m",
                  memory: "512Mi",
                },
                requests: {
                  cpu: "50m",
                  memory: "64Mi",
                },
              },
            },
          ],
          restartPolicy: "Never",
        },
      },
    },
  });
};
