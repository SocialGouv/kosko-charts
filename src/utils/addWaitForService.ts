import type { Deployment } from "kubernetes-models/apps/v1/Deployment";

import { addInitContainer } from "./addInitContainer";
import { waitForService } from "./waitForService";

/**
 *
 * This function will add a [[waitForService | wait-for-service]] initContainer to the first container of a given [[Deployment]]
 *
 *
 * ```typescript
 * import { addWaitForService } from "@socialgouv/kosko-charts/utils"
 *
 * addWaitForService(deployment, "hasura");
 * ```
 * @category utils
 * @return {Deployment}
 */
export const addWaitForService = (
  deployment: Deployment,
  name: string
): Deployment => {
  const initContainer = waitForService(name);

  addInitContainer(deployment, initContainer);

  return deployment;
};
