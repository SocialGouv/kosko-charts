import { Deployment } from "kubernetes-models/apps/v1/Deployment";

import { getDefaultPgParams } from "../components/azure-pg";
import { waitForPostgres } from "./waitForPostgres";

export const addWaitForPostgres = (deployment: Deployment): Deployment => {
  const defaultParams = getDefaultPgParams();

  const initContainer = waitForPostgres({
    secretRefName: defaultParams.name,
  });

  if (deployment.spec && deployment.spec.template.spec) {
    deployment.spec.template.spec.initContainers = [initContainer];
  }

  return deployment;
};
