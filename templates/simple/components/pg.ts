import env from "@kosko/env";
import { SealedSecret } from "@kubernetes-models/sealed-secrets/bitnami.com/v1alpha1/SealedSecret";

import { loadYaml } from "@socialgouv/kosko-charts/utils/getEnvironmentComponent";
import { updateMetadata } from "@socialgouv/kosko-charts/utils/updateMetadata";
import gitlab from "@socialgouv/kosko-charts/environments/gitlab";

import { create } from "@socialgouv/kosko-charts/components/azure-pg";

export default () => {
  if (env.env === "dev" || env.env === "local") {
    return create({
      env,
      config: {
        // custom script on create db
        prepareScript: `
ALTER USER user_${process.env.CI_COMMIT_SHORT_SHA} with CREATEROLE;
GRANT anonymous TO user_${process.env.CI_COMMIT_SHORT_SHA};
      `,
      },
    });
  }

  return [];
};
