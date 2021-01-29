import type { IIoK8sApiCoreV1Container } from "kubernetes-models/_definitions/IoK8sApiCoreV1Container";
import type { Deployment } from "kubernetes-models/apps/v1/Deployment";
import type { Job } from "kubernetes-models/batch/v1/Job";

type Manifest = Deployment | Job;

/**
 *
 * This function will add an initContainer to a given [[Deployment]]
 *
 * ```typescript
 * import { addInitContainer } from "@socialgouv/kosko-charts/utils"
 * import { Container } from "kubernetes-models/v1/Container";
 *
 * const initContainer = new Container({
 *   args: ["http://www.free.fr"],
 *   image: `registry.pouet.org/wait-for-http:2.4.0`,
 *   imagePullPolicy: "Always",
 *   name: `wait-for-free`,
 * });
 *
 * addInitContainer(deployment, initContainer);
 * ```
 * @category utils
 * @return {Deployment}
 */
export const addInitContainer = (
  deployment: Manifest,
  initContainer: IIoK8sApiCoreV1Container
): Manifest => {
  if (!deployment.spec?.template) {
    return deployment;
  }

  deployment.spec.template.spec = deployment.spec.template.spec ?? {
    containers: [],
    initContainers: [],
  };
  const containers = deployment.spec.template.spec.initContainers ?? [];
  containers.push(initContainer);
  deployment.spec.template.spec.initContainers = containers;

  return deployment;
};
