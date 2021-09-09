import environments from "@socialgouv/kosko-charts/environments";
import { generate } from "@socialgouv/kosko-charts/utils/environmentSlug";
import { readFileSync } from "fs";
import { Job } from "kubernetes-models/batch/v1/Job";
import { join } from "path";

interface AzureVolumePath {
  container: string;
  secretName?: string;
  volume: string;
}

const restoreContainerScript = readFileSync(
  join(__dirname, "./restore-container.job.script.sh"),
  "utf8"
);

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
              command: ["sh", "-c", restoreContainerScript],
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
