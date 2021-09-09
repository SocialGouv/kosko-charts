import ci from "@socialgouv/kosko-charts/environments";
import { generate } from "@socialgouv/kosko-charts/utils/environmentSlug";
import { Job } from "kubernetes-models/batch/v1";

const DEFAULT_EXTENSIONS = "hstore pgcrypto citext uuid-ossp";

const SOCIALGOUV_DOCKER_IMAGE = "ghcr.io/socialgouv/docker/azure-db";
// renovate: datasource=docker depName=ghcr.io/socialgouv/docker/azure-db versioning=6.45.0
const SOCIALGOUV_DOCKER_VERSION = "6.45.0";

export const createDbJob = (
  name: string,
  {
    database,
    extensions = DEFAULT_EXTENSIONS,
    password,
    secretRefName = `azure-pg-admin-user`,
    user,
  }: {
    database: string;
    extensions?: string;
    password: string;
    secretRefName?: string;
    user: string;
  }
): Job => {
  const env = ci(process.env);
  return new Job({
    metadata: {
      annotations: {
        ...env.metadata.annotations,
        "kapp.k14s.io/update-strategy": "skip",
      },
      labels: { ...env.metadata.labels, component: "create-db" },
      name: generate(name),
      namespace: env.metadata.namespace.name,
    },
    spec: {
      backoffLimit: 5,
      template: {
        metadata: {
          annotations: {
            "kapp.k14s.io/deploy-logs": "for-new",
          },
        },
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
                  value: password,
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
