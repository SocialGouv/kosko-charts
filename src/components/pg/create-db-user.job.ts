import environments from "@socialgouv/kosko-charts/environments";
import type { CIEnv } from "@socialgouv/kosko-charts/types";
import { Job } from "kubernetes-models/batch/v1";

const DEFAULT_EXTENSIONS = "hstore pgcrypto citext uuid-ossp";

const SOCIALGOUV_DOCKER_IMAGE = "ghcr.io/socialgouv/docker/azure-db";
// renovate: datasource=docker depName=ghcr.io/socialgouv/docker/azure-db versioning=6.64.0
const SOCIALGOUV_DOCKER_VERSION = "6.64.0";

export const createDbUserJob = ({
  database,
  extensions = DEFAULT_EXTENSIONS,
  secretRefName = `azure-pg-admin-user`,
  pgPasswordSecretKeyRef = "pgpassword",
  user,
  ciEnv,
}: {
  database: string;
  extensions?: string;
  secretRefName?: string;
  pgPasswordSecretKeyRef?: string;
  user: string;
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
                  value: database,
                },
                {
                  name: "NEW_USER",
                  value: user,
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
  const ciEnv = environments(process.env);
  const { projectName, branchSlug } = ciEnv;
  const database = `${projectName}-${branchSlug}`;
  const user = `${projectName}-${branchSlug}`;
  const job = createDbUserJob({
    ciEnv,
    database,
    user,
  });
  return [job];
};
