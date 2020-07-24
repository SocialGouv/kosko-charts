import { addToEnvFrom } from "@socialgouv/kosko-charts/utils/addToEnvFrom";
import { EnvFromSource } from "kubernetes-models/v1/EnvFromSource";

// DEV: add secret to access DB
//@ts-expect-error
export const addPostgresUserSecret = (deployment) => {
  if (deployment) {
    const name = process.env.PRODUCTION
      ? `azure-pg-user`
      : `azure-pg-user-${process.env.CI_COMMIT_SHORT_SHA}`;
    const azureSecretSource = new EnvFromSource({
      secretRef: {
        name,
      },
    });
    addToEnvFrom({
      deployment,
      data: [azureSecretSource],
    });
  }
};
