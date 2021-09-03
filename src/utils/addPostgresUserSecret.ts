import { addToEnvFrom } from "@socialgouv/kosko-charts/utils/addToEnvFrom";
import type { Deployment } from "kubernetes-models/apps/v1/Deployment";
import { EnvFromSource } from "kubernetes-models/v1/EnvFromSource";

import { autodevopsPgUserParams } from "../components/azure-pg/autodevops-user-params";
import environments from "../environments";

/**
 *
 * This function will add a reference to the default postgres user secret to a given [[Deployment]]
 *
 * This secret is named `azure-pg-user` or `azure-pg-user-SHA1` on feature-branches.
 *
 * ```typescript
 * import { addPostgresUserSecret } from "@socialgouv/kosko-charts/utils"
 *
 * addPostgresUserSecret(deployment);
 * ```
 * @category utils
 * @return {void}
 */
export const addPostgresUserSecret = (deployment?: Deployment): void => {
  if (!deployment) {
    return;
  }

  const ciEnv = environments(process.env);

  const currentBranchParams = autodevopsPgUserParams(ciEnv.branchSlug);

  const secretRefName =
    ciEnv.isPreProduction || ciEnv.isProduction
      ? `azure-pg-user`
      : currentBranchParams.name;

  const azureSecretSource = new EnvFromSource({
    secretRef: {
      name: secretRefName,
    },
  });
  addToEnvFrom({
    data: [azureSecretSource],
    deployment,
  });
};
