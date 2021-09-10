import environments from "@socialgouv/kosko-charts/environments";
import { generate } from "@socialgouv/kosko-charts/utils/environmentSlug";
import { Job } from "kubernetes-models/batch/v1/Job";

interface AzureVolumePath {
  container: string;
  secretName?: string;
  volume: string;
}

const restoreScript = `
[ ! -z $SOURCE_CONTAINER ] || (echo "No SOURCE_CONTAINER"; exit 1)
[ ! -z $SOURCE_ACCOUNT_NAME ] || (echo "No SOURCE_ACCOUNT_NAME"; exit 1)
[ ! -z $SOURCE_ACCOUNT_KEY ] || (echo "No SOURCE_ACCOUNT_KEY"; exit 1)
[ ! -z $DESTINATION_CONTAINER ] || (echo "No DESTINATION_CONTAINER"; exit 1)
[ ! -z $DESTINATION_ACCOUNT_NAME ] || (echo "No DESTINATION_ACCOUNT_NAME"; exit 1)
[ ! -z $DESTINATION_ACCOUNT_KEY ] || (echo "No DESTINATION_ACCOUNT_KEY"; exit 1)
echo "starting restore container $SOURCE_CONTAINER into $DESTINATION_CONTAINER"
# copy container
az storage copy -r \
  --source-account-name "$SOURCE_ACCOUNT_NAME" \
  --source-account-key "$SOURCE_ACCOUNT_KEY" \
  --source-container "$SOURCE_CONTAINER" \
  --account-name "$DESTINATION_ACCOUNT_NAME" \
  --account-key "$DESTINATION_ACCOUNT_KEY" \
  --destination-container "$DESTINATION_CONTAINER"
# get original permission
PUBLIC_ACCESS=\`az storage container show-permission \
  --account-name "$SOURCE_ACCOUNT_NAME" \
  --account-key "$SOURCE_ACCOUNT_KEY" \
  --name $SOURCE_CONTAINER | jq -r ".publicAccess"\`
# set original permission
az storage container set-permission \
  --name $DESTINATION_CONTAINER \
  --account-name "$DESTINATION_ACCOUNT_NAME" \
  --account-key "$DESTINATION_ACCOUNT_KEY" \
  --public-access $PUBLIC_ACCESS
`;

export const restoreContainerJob = (
  name: string,
  {
    from,
    to,
  }: {
    from: AzureVolumePath;
    to: AzureVolumePath;
  }
): Job => {
  const jobName = generate(`restore-container-${name}`);
  const env = environments(process.env);

  const projectSlug = env.projectName.replace(/-/g, "");

  const azurestorageaccountkey = "azurestorageaccountkey";
  const sourceSecretName = `azure-${projectSlug}${from.volume}-volume`;
  const destSecretName = `azure-${projectSlug}${to.volume}-volume`;
  const azurestorageaccountname = "azurestorageaccountname";
  return new Job({
    metadata: {
      annotations: {
        "kapp.k14s.io/update-strategy": "skip",
        ...env.metadata.annotations,
      },
      labels: {
        component: "restore-container",
        ...env.metadata.labels,
      },
      name: jobName,
      namespace: env.metadata.namespace.name,
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
          containers: [
            {
              command: ["sh", "-c", restoreScript],
              env: [
                {
                  name: "SOURCE_CONTAINER",
                  value: from.container,
                },
                {
                  name: "SOURCE_ACCOUNT_NAME",
                  valueFrom: {
                    secretKeyRef: {
                      key: azurestorageaccountname,
                      name: sourceSecretName,
                    },
                  },
                },
                {
                  name: "SOURCE_ACCOUNT_KEY",
                  valueFrom: {
                    secretKeyRef: {
                      key: azurestorageaccountkey,
                      name: sourceSecretName,
                    },
                  },
                },
                //
                {
                  name: "DESTINATION_CONTAINER",
                  value: to.container,
                },
                {
                  name: "DESTINATION_ACCOUNT_NAME",
                  valueFrom: {
                    secretKeyRef: {
                      key: azurestorageaccountname,
                      name: destSecretName,
                    },
                  },
                },
                {
                  name: "DESTINATION_ACCOUNT_KEY",
                  valueFrom: {
                    secretKeyRef: {
                      key: azurestorageaccountkey,
                      name: destSecretName,
                    },
                  },
                },
              ],
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
      ttlSecondsAfterFinished: 86400,
    },
  });
};
