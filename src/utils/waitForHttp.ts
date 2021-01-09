import type { IIoK8sApiCoreV1Container } from "kubernetes-models/_definitions/IoK8sApiCoreV1Container";

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
    image: `registry.gitlab.factory.social.gouv.fr/socialgouv/docker/wait-for-http:2.4.0`,
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
