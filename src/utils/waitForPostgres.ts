import type { IIoK8sApiCoreV1Container } from "kubernetes-models/_definitions/IoK8sApiCoreV1Container";

const SOCIALGOUV_DOCKER_IMAGE = "ghcr.io/socialgouv/docker/wait-for-postgres";
// renovate: datasource=docker depName=ghcr.io/socialgouv/docker/wait-for-postgres versioning=6.38.5
const SOCIALGOUV_DOCKER_VERSION = "6.38.5";

/** params for the [[waitForPostgres]] function */
export interface WaitForPostgresParams {
  /** name of the secret to use to check the PG connection */
  secretRefName: string;
}

/**
 * This creates a [[Container]] using the [wait-for-postgres](https://github.com/SocialGouv/docker/tree/master/wait-for-postgres) docker image
 *
 * ```typescript
 * import { waitForPostgres } from "@socialgouv/kosko-charts/utils"
 *
 * const container = waitForPostgres({
 *   secretRefName: "some-secret"
 * });
 * ```
 * @category utils
 * @return {IIoK8sApiCoreV1Container}
 */
export const waitForPostgres = ({
  secretRefName = "azure-pg-user",
}: WaitForPostgresParams): IIoK8sApiCoreV1Container => {
  return {
    env: [
      {
        name: "WAIT_FOR_RETRIES",
        value: "24", // = (2min x 60s) / 5s
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
    imagePullPolicy: "Always",
    name: "wait-for-postgres",
    resources: {
      limits: {
        cpu: "20m",
        memory: "32Mi",
      },
      requests: {
        cpu: "5m",
        memory: "16Mi",
      },
    },
  };
};
