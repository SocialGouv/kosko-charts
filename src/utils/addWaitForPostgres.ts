import { Deployment } from "kubernetes-models/apps/v1/Deployment";

import { getDefaultPgParams } from "../components/azure-pg";
import { waitForPostgres } from "./waitForPostgres";

export const addWaitForPostgres = (deployment: Deployment): Deployment => {
  const defaultParams = getDefaultPgParams();

  const secretRefName = process.env.CI_COMMIT_TAG
    ? `azure-pg-user`
    : defaultParams.name;
  const initContainer = waitForPostgres({
    secretRefName,
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
