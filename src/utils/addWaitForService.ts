import { Deployment } from "kubernetes-models/apps/v1/Deployment";

import { addInitContainer } from "./addInitContainer";
import { waitForService } from "./waitForService";

export const addWaitForService = (
  deployment: Deployment,
  name: string
): Deployment => {
  const initContainer = waitForService(name);

  addInitContainer(deployment, initContainer);

  return deployment;
};
