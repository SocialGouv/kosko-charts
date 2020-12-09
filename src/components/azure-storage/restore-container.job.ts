import ok from "assert";
import { Job } from "kubernetes-models/batch/v1/Job";
import { EnvFromSource } from "kubernetes-models/v1/EnvFromSource";
import { EnvVar } from "kubernetes-models/v1/EnvVar";

interface RestoreJobArgs {
  project: string;
  env: EnvVar[]; // todo: env must have DESTINATION_CONTAINER and DESTINATION_CONTAINER
  envFrom?: EnvFromSource[];
  from: "prod" | "dev";
  to: "prod" | "dev";
}

interface RestoreContainerJobArgs {
  project: string;
  env: EnvVar[]; // todo: env must have DESTINATION_CONTAINER and DESTINATION_CONTAINER
  envFrom?: EnvFromSource[];
}

const getProjectSecretNamespace = (project: string) => `${project}-secret`;

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

export const restoreJob = ({
  project,
  env = [],
  envFrom = [],
  from,
  to,
}: RestoreJobArgs): Job => {
  const projectSlug = project.replace(/-/g, "");
  const jobEnv = [];
  // create needed env vars depending on the environemnt
  if (from === "dev") {
    jobEnv.push(
      new EnvVar({
        name: "SOURCE_ACCOUNT_NAME",
        valueFrom: {
          secretKeyRef: {
            name: `azure-${projectSlug}dev-volume`,
            key: "azurestorageaccountname",
          },
        },
      })
    );
    jobEnv.push(
      new EnvVar({
        name: "SOURCE_ACCOUNT_KEY",
        valueFrom: {
          secretKeyRef: {
            name: `azure-${projectSlug}dev-volume`,
            key: "azurestorageaccountkey",
          },
        },
      })
    );
  } else if (from === "prod") {
    jobEnv.push(
      new EnvVar({
        name: "SOURCE_ACCOUNT_NAME",
        valueFrom: {
          secretKeyRef: {
            name: `azure-${projectSlug}prod-volume`,
            key: "azurestorageaccountname",
          },
        },
      })
    );
    jobEnv.push(
      new EnvVar({
        name: "SOURCE_ACCOUNT_KEY",
        valueFrom: {
          secretKeyRef: {
            name: `azure-${projectSlug}prod-volume`,
            key: "azurestorageaccountkey",
          },
        },
      })
    );
  }
  if (to === "dev") {
    jobEnv.push(
      new EnvVar({
        name: "DESTINATION_ACCOUNT_NAME",
        valueFrom: {
          secretKeyRef: {
            name: `azure-${projectSlug}dev-volume`,
            key: "azurestorageaccountname",
          },
        },
      })
    );
    jobEnv.push(
      new EnvVar({
        name: "DESTINATION_ACCOUNT_KEY",
        valueFrom: {
          secretKeyRef: {
            name: `azure-${projectSlug}dev-volume`,
            key: "azurestorageaccountkey",
          },
        },
      })
    );
  } else if (to === "prod") {
    jobEnv.push(
      new EnvVar({
        name: "DESTINATION_ACCOUNT_NAME",
        valueFrom: {
          secretKeyRef: {
            name: `azure-${projectSlug}prod-volume`,
            key: "azurestorageaccountname",
          },
        },
      })
    );
    jobEnv.push(
      new EnvVar({
        name: "DESTINATION_ACCOUNT_KEY",
        valueFrom: {
          secretKeyRef: {
            name: `azure-${projectSlug}prod-volume`,
            key: "azurestorageaccountkey",
          },
        },
      })
    );
  }

  return restoreContainerJob({
    project,
    envFrom,
    env: [...jobEnv, ...env],
  });
};

export const restoreContainerJob = ({
  project,
  env = [],
  envFrom = [],
}: RestoreContainerJobArgs): Job => {
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
