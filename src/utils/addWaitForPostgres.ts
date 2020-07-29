import { Deployment } from "kubernetes-models/apps/v1/Deployment";

import { getDefaultPgParams } from "../components/azure-pg";
import { waitForPostgres } from "./waitForPostgres";

export const addWaitForPostgres = (deployment: Deployment): Deployment => {
  const defaultParams = getDefaultPgParams();

  const initContainer = waitForPostgres({
    secretRefName: defaultParams.name,
  });

  if (deployment.spec) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!deployment.spec.template) {
      //@ts-expect-error
      deployment.spec.template = { spec: {} };
    }
    //@ts-expect-error
    deployment.spec.template.spec.initContainers = [initContainer];
  }

  return deployment;
};
