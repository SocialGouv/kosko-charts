import { Job } from "kubernetes-models/batch/v1/Job";

export const dropAutodevopsDbsJob = ({
  secretRefName = `azure-pg-admin-user`,
}): Job => {
  return new Job({
    metadata: {
      name: `drop-azure-autodevops-dbs-${process.env.CI_COMMIT_SHORT_SHA}`,
    },
    spec: {
      backoffLimit: 0,
      template: {
        metadata: {},
        spec: {
          containers: [
            {
              command: ["drop-autodevops-dbs"],
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
              name: "drop-autodevops-dbs",
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
