import type { Deployment } from "kubernetes-models/apps/v1/Deployment";

import { getDefaultPgParams } from "../components/azure-pg";
import { addInitContainer } from "./addInitContainer";
import { waitForPostgres } from "./waitForPostgres";

/**
 *
 * This function will add a [[waitForPostgres | wait-for-postgres]] initContainer to the first container of a given [[Deployment]]
 *
 * ```typescript
 * import { addWaitForPostgres } from "@socialgouv/kosko-charts/utils"
 *
 * addWaitForPostgres(deployment);
 * ```
 * @category utils
 * @return {Deployment}
 */
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
