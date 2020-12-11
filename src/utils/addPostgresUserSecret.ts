import { addToEnvFrom } from "@socialgouv/kosko-charts/utils/addToEnvFrom";
import type { Deployment } from "kubernetes-models/apps/v1/Deployment";
import { EnvFromSource } from "kubernetes-models/v1/EnvFromSource";

export const addPostgresUserSecret = (deployment?: Deployment): void => {
  if (!deployment) {
    return;
  }

  const name = process.env.CI_COMMIT_TAG
    ? `azure-pg-user`
    : `azure-pg-user-${process.env.CI_COMMIT_SHORT_SHA}`;
  const azureSecretSource = new EnvFromSource({
    secretRef: {
      name,
    },
  });
  addToEnvFrom({
    data: [azureSecretSource],
    deployment,
  });
};
