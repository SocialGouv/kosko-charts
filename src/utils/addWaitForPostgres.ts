import type { Deployment } from "kubernetes-models/apps/v1/Deployment";
import type { Job } from "kubernetes-models/batch/v1/Job";

import { autodevopsPgUserParams } from "../components/azure-pg/autodevops-user-params";
import environments from "../environments";
import { addInitContainer } from "./addInitContainer";
import { waitForPostgres } from "./waitForPostgres";

type Manifest = Deployment | Job;

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
 * @return {Manifest}
 */
export const addWaitForPostgres = (deployment: Manifest): Manifest => {
  const ciEnv = environments(process.env);
  const currentBranchParams = autodevopsPgUserParams(ciEnv.branchSlug);

  const secretRefName =
    ciEnv.isPreProduction || ciEnv.isProduction
      ? `azure-pg-user`
      : currentBranchParams.name;

  const initContainer = waitForPostgres({
    secretRefName,
  });

  addInitContainer(deployment, initContainer);

  return deployment;
};
