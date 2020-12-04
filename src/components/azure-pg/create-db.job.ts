//import { metadataFromParams } from "@socialgouv/kosko-charts/components/app/metadata";
import { Job } from "kubernetes-models/batch/v1/Job";

//import { Params } from "../azure-db/params";

const DEFAULT_EXTENSIONS = "hstore pgcrypto citext";

// renovate: datasource=docker depName=registry.gitlab.factory.social.gouv.fr/socialgouv/docker/azure-db versioning=2.1.0
const SOCIALGOUV_DOCKER_AZURE_DB = "2.1.0";

// needs azure-pg-admin-user secret
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createDbJob = ({
  //@ts-expect-error
  database,
  //@ts-expect-error
  user,
  //@ts-expect-error
  password,
  extensions = DEFAULT_EXTENSIONS,
  secretRefName = `azure-pg-admin-user`,
}): Job => {
  const job = new Job({
    metadata: {
      //  ...metadataFromParams(params),
    },
    spec: {
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
                "registry.gitlab.factory.social.gouv.fr/socialgouv/docker/azure-db:" +
                SOCIALGOUV_DOCKER_AZURE_DB,
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
  return job;
};
