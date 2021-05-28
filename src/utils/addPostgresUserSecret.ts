import { addToEnvFrom } from "@socialgouv/kosko-charts/utils/addToEnvFrom";
import type { Deployment } from "kubernetes-models/apps/v1/Deployment";
import type { StatefulSet } from "kubernetes-models/apps/v1/StatefulSet";
import { EnvFromSource } from "kubernetes-models/v1/EnvFromSource";

import { getDefaultPgParams } from "../components/azure-pg";

type Manifest = Deployment | StatefulSet;

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
export const addPostgresUserSecret = (deployment?: Manifest): void => {
  if (!deployment) {
    return;
  }

  const defaultParams = getDefaultPgParams();

  const secretRefName = process.env.CI_COMMIT_TAG
    ? `azure-pg-user`
    : defaultParams.name;

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
