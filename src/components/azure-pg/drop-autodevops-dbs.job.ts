import { Job } from "kubernetes-models/batch/v1";

interface DropAutodevopsDbsJobArgs {
  secretRefName?: string;
}

const SOCIALGOUV_DOCKER_IMAGE = "ghcr.io/socialgouv/docker/azure-db";
// renovate: datasource=docker depName=ghcr.io/socialgouv/docker/azure-db versioning=6.26.2
const SOCIALGOUV_DOCKER_VERSION = "6.26.2";

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
              image: `${SOCIALGOUV_DOCKER_IMAGE}:${SOCIALGOUV_DOCKER_VERSION}`,
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
