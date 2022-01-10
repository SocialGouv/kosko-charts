import environments from "@socialgouv/kosko-charts/environments";
import type { CIEnv } from "@socialgouv/kosko-charts/types";
import { Job } from "kubernetes-models/batch/v1";

const DEFAULT_EXTENSIONS = "hstore pgcrypto citext uuid-ossp";

const SOCIALGOUV_DOCKER_IMAGE = "ghcr.io/socialgouv/docker/azure-db";
// renovate: datasource=docker depName=ghcr.io/socialgouv/docker/azure-db versioning=6.64.0
const SOCIALGOUV_DOCKER_VERSION = "6.64.0";

const defaultSecretRefName = `azure-pg-admin-user`;

/* maybe in future 🤞 */
// const defaultSecretRefName = `pg-scaleway`;

export const createDbUserJob = ({
  extensions = DEFAULT_EXTENSIONS,
  secretRefName,
  pgPasswordSecretKeyRef,
  ciEnv,
}: {
  extensions?: string;
  secretRefName?: string;
  pgPasswordSecretKeyRef: string;
  ciEnv: CIEnv;
}): Job => {
  return new Job({
    metadata: {
      annotations: ciEnv.metadata.annotations,
      labels: ciEnv.metadata.labels,
      name: `create-db-user`,
      namespace: ciEnv.metadata.namespace.name,
    },
    spec: {
      backoffLimit: 5,
      template: {
        spec: {
          containers: [
            {
              command: ["create-db-user"],
              env: [
                {
                  name: "NEW_DB_NAME",
                  valueFrom: {
                    secretKeyRef: {
                      key: "PGDATABASE",
                      name: pgPasswordSecretKeyRef,
                    },
                  },
                },
                {
                  name: "NEW_USER",
                  valueFrom: {
                    secretKeyRef: {
                      key: "PGUSER",
                      name: pgPasswordSecretKeyRef,
                    },
                  },
                },
                {
                  name: "NEW_PASSWORD",
                  valueFrom: {
                    secretKeyRef: {
                      key: "PGPASSWORD",
                      name: pgPasswordSecretKeyRef,
                    },
                  },
                },
                {
                  name: "PGHOST",
                  valueFrom: {
                    secretKeyRef: {
                      key: "PGHOST",
                      name: pgPasswordSecretKeyRef,
                    },
                  },
                },
                {
                  name: "NEW_DB_EXTENSIONS",
                  value: extensions,
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
              name: "create-db-user",
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

export default (): [Job] => {
  const { env } = process;
  const ciEnv = environments(env);
  const secretRefName = env.ADMIN_PG_SECRET ?? defaultSecretRefName;
  const pgPasswordSecretKeyRef = ciEnv.isProduction
    ? `azure-pg-user`
    : ciEnv.isPreProduction
    ? `azure-pg-user-preprod`
    : `azure-pg-user-${ciEnv.branchSlug}`;
  const job = createDbUserJob({
    ciEnv,
    pgPasswordSecretKeyRef,
    secretRefName,
  });
  return [job];
};
