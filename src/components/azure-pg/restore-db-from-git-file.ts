import { autodevopsPgUserParams } from "@socialgouv/kosko-charts/components/azure-pg";
import environments from "@socialgouv/kosko-charts/environments";
import { generate } from "@socialgouv/kosko-charts/utils/environmentSlug";
import type { IJob } from "kubernetes-models/batch/v1";
import { Job } from "kubernetes-models/batch/v1";
import { Volume, VolumeMount } from "kubernetes-models/v1";
import { join } from "path";

// renovate: datasource=docker depName=postgres versioning=10.16
const POSTGRES_VERSION = "10.16";

// renovate: datasource=docker depName=alpine/git versioning=v2.30.2
const ALPINE_GIT_VERSION = "v2.30.2";

/**
 *
 * Restore a database usint a file from a repository
 *
 * ```typescript
 * import { restoreDbFromFile } from "@socialgouv/kosko-charts/azure-pg";
 *
 * restoreDbFromFile("my-restore-db", {
 *   dumpFile: "my-dump.sql",
 *   repository: "SocialGouv/sample-next-app"
 * });
 *
 * // for none Github repos
 * restoreDbFromFile("my-restore-db", {
 *   dumpFile: "my-dump.sql",
 *   repository: "https://gitlab.factory.social.gouv.fr/SocialGouv/sample-next-app/sample-next-app"
 * });
 * ```
 * @category utils
 * @return {Deployment}
 */
export function restoreDbFromFile(
  name: string,
  { filePath, repository }: { filePath: string; repository: string }
): IJob {
  const ciEnv = environments(process.env);
  const pgParams = autodevopsPgUserParams(ciEnv.branchSlug);

  const repositoryUrl = repository.startsWith("https://")
    ? repository
    : `https://github.com/${repository}`;

  const volume = new Volume({
    emptyDir: {},
    name: "restore-db-volume",
  });

  const volumeMount = new VolumeMount({
    mountPath: `/mnt/${ciEnv.projectName}`,
    name: volume.name,
  });

  return new Job({
    metadata: {
      annotations: ciEnv.metadata.annotations,
      labels: ciEnv.metadata.labels,
      name: generate(`restore-db-${ciEnv.branch}`),
      namespace: ciEnv.metadata.namespace.name,
    },
    spec: {
      template: {
        metadata: {},
        spec: {
          containers: [
            {
              args: [`psql < ${join(volumeMount.mountPath, filePath)}`],
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
              image: `postgres:${POSTGRES_VERSION}`,
              name: "restore-db",
              volumeMounts: [volumeMount],
            },
          ],
          initContainers: [
            {
              args: ["clone", repositoryUrl, volumeMount.mountPath],
              command: ["git"],
              image: `alpine/git:${ALPINE_GIT_VERSION}`,
              name: "restore-db-init",
              volumeMounts: [volumeMount],
            },
          ],
          restartPolicy: "OnFailure",
          volumes: [volume],
        },
      },
      ttlSecondsAfterFinished: 86400,
    },
  });
}
