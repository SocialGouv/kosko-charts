import { Job } from "kubernetes-models/batch/v1/Job";

interface PsqlJobParams {
  secretRefName?: string;
  database: string;
  script: string;
}
// needs azure-pg-admin-user secret
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createPsqlJob = ({
  script,
  database,
  secretRefName = `azure-pg-admin-user`,
}: PsqlJobParams): Job => {
  const job = new Job({
    metadata: {},
    spec: {
      backoffLimit: 0,
      template: {
        spec: {
          containers: [
            {
              command: ["psql", "--dbname", database, "-c", script],
              envFrom: [
                {
                  secretRef: {
                    name: secretRefName,
                  },
                },
              ],
              image: "postgres:10",
              imagePullPolicy: "IfNotPresent",
              name: "psql-job",
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
