import { Deployment } from "kubernetes-models/apps/v1/Deployment";

import { addInitContainer } from "./addInitContainer";
import { waitForHttp } from "./waitForHttp";

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
