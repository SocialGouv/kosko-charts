import { assertEnv } from "@socialgouv/kosko-charts/utils/assertEnv";
import { Job } from "kubernetes-models/batch/v1";

const SOCIALGOUV_DOCKER_IMAGE = "ghcr.io/socialgouv/docker/azure-db";
// renovate: datasource=docker depName=ghcr.io/socialgouv/docker/azure-db versioning=6.43.0
const SOCIALGOUV_DOCKER_VERSION = "6.43.0";

const assert = assertEnv(["CI_COMMIT_SHORT_SHA"]);
export const dropDbJob = ({
  database,
  secretRefName = `azure-pg-admin-user`,
  user,
}: {
  database: string;
  secretRefName?: string;
  user: string;
}): Job => {
  assert();

  return new Job({
    metadata: {
      name: `drop-azure-db-${process.env.CI_COMMIT_SHORT_SHA}`,
    },
    spec: {
      backoffLimit: 0,
      template: {
        metadata: {},
        spec: {
          containers: [
            {
              command: ["drop-db-user"],
              env: [
                {
                  name: "DROP_DATABASE",
                  value: database,
                },
                {
                  name: "DROP_USER",
                  value: user,
                },
              ],
              envFrom: [
                {
                  secretRef: {
                    name: secretRefName,
                  },
                },
              ],
              image: `${SOCIALGOUV_DOCKER_IMAGE}:${SOCIALGOUV_DOCKER_VERSION}`,
              imagePullPolicy: "IfNotPresent",
              name: "drop-db-user",
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
      ttlSecondsAfterFinished: 86400,
    },
  });
};
