import type { Deployment } from "kubernetes-models/apps/v1/Deployment";

import { addInitContainer } from "./addInitContainer";
import { waitForHttp } from "./waitForHttp";

/**
 *
 * This function will add a [[waitForHttp | wait-for-http]] initContainer to the first container of a given [[Deployment]]
 *
 * ```typescript
 * import { addWaitForHttp } from "@socialgouv/kosko-charts/utils"
 *
 * addWaitForHttp(deployment, "http://www.free.fr");
 * ```
 * @category utils
 * @return {Deployment}
 */
export const addWaitForHttp = (
  deployment: Deployment,
  url: string
): Deployment => {
  const initContainer = waitForHttp({
    name: deployment.metadata?.name ?? "waiter",
    url,
  });

  addInitContainer(deployment, initContainer);

  return deployment;
};
