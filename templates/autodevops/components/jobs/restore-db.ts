import { getDevDatabaseParameters } from "@socialgouv/kosko-charts/components/azure-pg/params";
import environments from "@socialgouv/kosko-charts/environments";
import { Job } from "kubernetes-models/batch/v1";

import type { JobType } from "../../types/config";
import Config from "../../utils/config";

const ciEnv = environments(process.env);
const pgParams = getDevDatabaseParameters({ suffix: ciEnv.branch });

const getJob = async () => {
  const { name, restoreDb } = await Config();

  if (restoreDb) {
    return new Job({
      metadata: {
        annotations: ciEnv.metadata.annotations,
        labels: ciEnv.metadata.labels,
        name: `restore-db-${ciEnv.shortSha}`,
        namespace: ciEnv.metadata.namespace.name,
      },
      spec: {
        template: {
          metadata: {},
          spec: {
            containers: [
              {
                args: [`psql < /mnt/${name}/${restoreDb}`],
                command: ["sh", "-c"],
                env: [
                  {
                    name: "PGDATABASE",
                    value: pgParams.database,
                  },
                ],
                envFrom: [
                  {
                    secretRef: {
                      name: "azure-pg-admin-user",
                    },
                  },
                ],
                image: "postgres:10.16",
                name: "restore-db",
                volumeMounts: [
                  {
                    mountPath: `/mnt/${name}`,
                    name: "restore-db-volume",
                  },
                ],
              },
            ],
            initContainers: [
              {
                args: [
                  "clone",
                  `https://github.com/SocialGouv/${name}.git`,
                  `/mnt/${name}`,
                ],
                command: ["git"],
                image: "alpine/git:v2.30.2",
                name: "restore-db-init",
                volumeMounts: [
                  {
                    mountPath: `/mnt/${name}`,
                    name: "restore-db-volume",
                  },
                ],
              },
            ],
            restartPolicy: "OnFailure",
            volumes: [
              {
                emptyDir: {},
                name: "restore-db-volume",
              },
            ],
          },
        },
        ttlSecondsAfterFinished: 86400,
      },
    });
  } else return false;
};

export default async (): JobType => {
  const job = await getJob();
  if (job) {
    return [job];
  } else {
    return Promise.resolve([]);
  }
};
