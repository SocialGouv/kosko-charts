import type { Deployment } from "kubernetes-models/apps/v1/Deployment";

import { getDefaultPgParams } from "../components/azure-pg";
import { addInitContainer } from "./addInitContainer";
import { waitForPostgres } from "./waitForPostgres";

export const addWaitForPostgres = (deployment: Deployment): Deployment => {
  const defaultParams = getDefaultPgParams();

  const secretRefName = process.env.CI_COMMIT_TAG
    ? `azure-pg-user`
    : defaultParams.name;

  const initContainer = waitForPostgres({
    secretRefName,
  });

  addInitContainer(deployment, initContainer);

  return deployment;
};
