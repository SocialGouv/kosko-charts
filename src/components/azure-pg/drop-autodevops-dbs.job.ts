import { Job } from "kubernetes-models/batch/v1/Job";

interface DropAutodevopsDbsJobArgs {
  secretRefName?: string;
}

// renovate: datasource=docker depName=socialgouv/docker/azure-db registryUrl=registry.gitlab.factory.social.gouv.fr versioning=2.1.0
const SOCIALGOUV_DOCKER_AZURE_DB_VERSION  = "2.1.0";

export const dropAutodevopsDbsJob = ({
  secretRefName = `azure-pg-admin-user`,
}: DropAutodevopsDbsJobArgs = {}): Job => {
  return new Job({
    metadata: {
      name: `drop-azure-autodevops-dbs-${process.env.CI_COMMIT_SHORT_SHA}`,
    },
    spec: {
      backoffLimit: 0,
      template: {
        metadata: {},
        spec: {
          containers: [
            {
              command: ["drop-autodevops-dbs"],
              envFrom: [
                {
                  secretRef: {
                    name: secretRefName,
                  },
                },
              ],
              image:
                "registry.gitlab.factory.social.gouv.fr/socialgouv/docker/azure-db:" +
                SOCIALGOUV_DOCKER_AZURE_DB_VERSION,
              imagePullPolicy: "IfNotPresent",
              name: "drop-autodevops-dbs",
              resources: {
                limits: {
                  cpu: "300m",
                  memory: "256Mi",
                },
                requests: {
                  cpu: "100m",
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
