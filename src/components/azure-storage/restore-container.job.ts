import environments from "@socialgouv/kosko-charts/environments";
import { generate } from "@socialgouv/kosko-charts/utils/environmentSlug";
import { readFileSync } from "fs";
import { Job } from "kubernetes-models/batch/v1/Job";
import type { EnvFromSource } from "kubernetes-models/v1/EnvFromSource";
import { EnvVar } from "kubernetes-models/v1/EnvVar";
import { join } from "path";

interface RestoreJobArgs {
  project: string;
  env: EnvVar[]; // todo: env must have DESTINATION_CONTAINER and DESTINATION_CONTAINER
  envFrom?: EnvFromSource[];
  from: "dev" | "prod";
  to: "dev" | "prod";
}

const getProjectSecretNamespace = (project: string) => `${project}-secret`;

const restoreContainerScript = readFileSync(
  join(__dirname, "./restore-container.job.script.sh"),
  "utf8"
);

export const restoreContainerJob = ({
  project,
  env = [],
  envFrom = [],
  from,
  to,
}: RestoreJobArgs): Job => {
  const ciEnv = environments(process.env);
  const secretNamespace = getProjectSecretNamespace(project);
  const jobEnv = scriptEnv(project, from, to);

  const jobName = generate(`restore-container-${ciEnv.branch}`);
  return new Job({
    metadata: {
      annotations: { "kapp.k14s.io/update-strategy": "skip" },
      labels: {
        component: "restore-container",
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
        spec: {
          containers: [
            {
              command: ["sh", "-c", restoreContainerScript],
              env: [...jobEnv, ...env],
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
      ttlSecondsAfterFinished: 86400,
    },
  });
};

function scriptEnv(project: string, from: string, to: string) {
  const projectSlug = project.replace(/-/g, "");
  const jobEnv = [];
  // create needed env vars depending on the environemnt
  if (from === "prod") {
    jobEnv.push(
      new EnvVar({
        name: "SOURCE_ACCOUNT_NAME",
        valueFrom: {
          secretKeyRef: {
            key: "azurestorageaccountname",
            name: `azure-${projectSlug}prod-volume`,
          },
        },
      })
    );
    jobEnv.push(
      new EnvVar({
        name: "SOURCE_ACCOUNT_KEY",
        valueFrom: {
          secretKeyRef: {
            key: "azurestorageaccountkey",
            name: `azure-${projectSlug}prod-volume`,
          },
        },
      })
    );
  } else {
    jobEnv.push(
      new EnvVar({
        name: "SOURCE_ACCOUNT_NAME",
        valueFrom: {
          secretKeyRef: {
            key: "azurestorageaccountname",
            name: `azure-${projectSlug}dev-volume`,
          },
        },
      })
    );
    jobEnv.push(
      new EnvVar({
        name: "SOURCE_ACCOUNT_KEY",
        valueFrom: {
          secretKeyRef: {
            key: "azurestorageaccountkey",
            name: `azure-${projectSlug}dev-volume`,
          },
        },
      })
    );
  }
  if (to === "prod") {
    jobEnv.push(
      new EnvVar({
        name: "DESTINATION_ACCOUNT_NAME",
        valueFrom: {
          secretKeyRef: {
            key: "azurestorageaccountname",
            name: `azure-${projectSlug}prod-volume`,
          },
        },
      })
    );
    jobEnv.push(
      new EnvVar({
        name: "DESTINATION_ACCOUNT_KEY",
        valueFrom: {
          secretKeyRef: {
            key: "azurestorageaccountkey",
            name: `azure-${projectSlug}prod-volume`,
          },
        },
      })
    );
  } else {
    jobEnv.push(
      new EnvVar({
        name: "DESTINATION_ACCOUNT_NAME",
        valueFrom: {
          secretKeyRef: {
            key: "azurestorageaccountname",
            name: `azure-${projectSlug}dev-volume`,
          },
        },
      })
    );
    jobEnv.push(
      new EnvVar({
        name: "DESTINATION_ACCOUNT_KEY",
        valueFrom: {
          secretKeyRef: {
            key: "azurestorageaccountkey",
            name: `azure-${projectSlug}dev-volume`,
          },
        },
      })
    );
  }
  return jobEnv;
}
