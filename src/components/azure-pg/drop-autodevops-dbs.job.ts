import { ok } from "assert";
import { Job } from "kubernetes-models/batch/v1/Job";

interface DropAutodevopsDbsJobArgs {
  secretRefName?: string;
}

const SOCIALGOUV_DOCKER_IMAGE = "ghcr.io/socialgouv/docker/azure-db";
// renovate: datasource=docker depName=ghcr.io/socialgouv/docker/azure-db versioning=6.0.1
const SOCIALGOUV_DOCKER_VERSION = "6.0.1";

export const dropAutodevopsDbsJob = ({
  secretRefName = `azure-pg-admin-user`,
}: DropAutodevopsDbsJobArgs = {}): Job => {
  ok(process.env.GITHUB_SHA);
  const sha = process.env.GITHUB_SHA.slice(0, 7);
  return new Job({
    metadata: {
      name: `drop-azure-autodevops-dbs-${sha}`,
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
