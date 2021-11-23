import environments from "@socialgouv/kosko-charts/environments";
import type { CIEnv } from "@socialgouv/kosko-charts/types";
import { Job } from "kubernetes-models/batch/v1";

const SOCIALGOUV_DOCKER_IMAGE = "ghcr.io/socialgouv/docker/azure-db";
const SOCIALGOUV_DOCKER_VERSION = "6.63.0";

export const createDbSecretJob = ({
  pgPasswordSecretKeyRef = "pgpassword",
  ciEnv,
}: {
  pgPasswordSecretKeyRef?: string;
  ciEnv: CIEnv;
}): Job => {
  return new Job({
    metadata: {
      annotations: ciEnv.metadata.annotations,
      labels: ciEnv.metadata.labels,
      name: `create-db-secret-${ciEnv.shortSha}`,
      namespace: ciEnv.metadata.namespace.name,
    },
    spec: {
      template: {
        metadata: {},
        spec: {
          containers: [
            {
              args: ["create-db-secret $"],
              command: ["sh", "-c"],
              env: [
                {
                  name: "K8S_NS",
                  value: ciEnv.metadata.namespace.name,
                },
                {
                  name: "PGPASSWORD_SECRET_NAME",
                  value: pgPasswordSecretKeyRef,
                },
              ],
              image: `${SOCIALGOUV_DOCKER_IMAGE}:${SOCIALGOUV_DOCKER_VERSION}`,
              imagePullPolicy: "IfNotPresent",
              name: "create-db-secret",
            },
          ],
          restartPolicy: "OnFailure",
        },
      },
      ttlSecondsAfterFinished: 86400,
    },
  });
};

export default (): [Job] => {
  const ciEnv = environments(process.env);
  const job = createDbSecretJob({ ciEnv });
  return [job];
};
