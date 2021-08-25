import environments from "@socialgouv/kosko-charts/environments";
import { Job } from "kubernetes-models/batch/v1";

const SOCIALGOUV_DOCKER_IMAGE = "ghcr.io/socialgouv/docker/azure-db";
// renovate: datasource=docker depName=ghcr.io/socialgouv/docker/azure-db versioning=6.43.1
const SOCIALGOUV_DOCKER_VERSION = "6.43.1";

export const dropDbJob = ({
  database,
  secretRefName = `azure-pg-admin-user`,
  user,
}: {
  database: string;
  secretRefName?: string;
  user: string;
}): Job => {
  const ciEnv = environments(process.env);
  return new Job({
    metadata: {
      annotations: {
        "kapp.k14s.io/disable-default-label-scoping-rules": "",
        "kapp.k14s.io/disable-default-ownership-label-rules": "",
        // see https://carvel.dev/kapp/docs/latest/apply/#kappk14siononce
        "kapp.k14s.io/nonce": "",
        // see https://carvel.dev/kapp/docs/latest/apply/#kappk14sioupdate-strategy
        "kapp.k14s.io/update-strategy": "fallback-on-replace",
      },
      name: `drop-azure-db-${ciEnv.shortSha}`,
    },
    spec: {
      backoffLimit: 0,
      template: {
        metadata: {
          annotations: {
            // see https://carvel.dev/kapp/docs/latest/apply/#kappk14siodeploy-logs
            "kapp.k14s.io/deploy-logs": "",
          },
        },
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
