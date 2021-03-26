import { assertEnv } from "@socialgouv/kosko-charts/utils/assertEnv";
import { Job } from "kubernetes-models/batch/v1/Job";

// renovate: datasource=docker depName=registry.gitlab.factory.social.gouv.fr/socialgouv/docker/azure-db versioning=2.6.1
const SOCIALGOUV_DOCKER_AZURE_DB = "2.6.1";

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
      annotations: {
        "kapp.k14s.io/disable-default-label-scoping-rules": "",
        "kapp.k14s.io/disable-default-ownership-label-rules": "",
        // see https://carvel.dev/kapp/docs/latest/apply/#kappk14siononce
        "kapp.k14s.io/nonce": "",
        // see https://carvel.dev/kapp/docs/latest/apply/#kappk14sioupdate-strategy
        "kapp.k14s.io/update-strategy": "fallback-on-replace",
      },
      name: `drop-azure-db-${process.env.CI_COMMIT_SHORT_SHA}`,
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
              image:
                "registry.gitlab.factory.social.gouv.fr/socialgouv/docker/azure-db:" +
                SOCIALGOUV_DOCKER_AZURE_DB,
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
