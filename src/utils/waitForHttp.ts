import type { IIoK8sApiCoreV1Container } from "kubernetes-models/_definitions/IoK8sApiCoreV1Container";

const SOCIALGOUV_DOCKER_IMAGE = "ghcr.io/socialgouv/docker/wait-for-http";
// renovate: datasource=docker depName=ghcr.io/socialgouv/docker/wait-for-http versioning=6.56.0
const SOCIALGOUV_DOCKER_VERSION = "6.56.0";

/** params for the [[waitForHttp]] function */
export interface WaitForHttpParams {
  /** name of the container */
  name: string;
  /** url to wait for */
  url: string;
}

/**
 * This creates a [[Container]] using the [wait-for-http](https://github.com/SocialGouv/docker/tree/master/wait-for-http) docker image
 *
 * ```typescript
 * import { waitForHttp } from "@socialgouv/kosko-charts/utils"
 *
 * const container = waitForHttp({
 *   name: "wait-for-free",
 *   url: "http://www.free.fr"
 * });
 * ```
 * @category utils
 * @return {IIoK8sApiCoreV1Container}
 */
export const waitForHttp = ({
  name,
  url,
}: WaitForHttpParams): IIoK8sApiCoreV1Container => {
  return {
    args: [url],
    image: `${SOCIALGOUV_DOCKER_IMAGE}:${SOCIALGOUV_DOCKER_VERSION}`,
    imagePullPolicy: "Always",
    name: `wait-for-${name}`,
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
