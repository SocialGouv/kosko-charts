import { Job } from "kubernetes-models/batch/v1/Job";

const DEFAULT_EXTENSIONS = "hstore pgcrypto citext";

export const createDbJob = ({
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
}): Job => {
  const job = new Job({
    spec: {
      ttlSecondsAfterFinished: 86400,
      backoffLimit: 0,
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
              image:
                "registry.gitlab.factory.social.gouv.fr/socialgouv/docker/azure-db:2.1.0",
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
    },
  });
  return job;
};
