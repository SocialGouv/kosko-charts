//import env from "@kosko/env";
//import { metadataFromParams } from "@socialgouv/kosko-charts/components/app/metadata";
import { Job } from "kubernetes-models/batch/v1/Job";

export const dropDbJob = ({
  //@ts-expect-error
  database,
  //@ts-expect-error
  user,
  secretRefName = `azure-pg-admin-user`,
}): Job => {
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
              image:
                "registry.gitlab.factory.social.gouv.fr/socialgouv/docker/azure-db:0.28.0",
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
    },
  });
};
