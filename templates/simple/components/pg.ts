import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/azure-pg";

export default () => {
  if (env.env === "dev" || env.env === "local") {
    return create({
      config: {
        // custom script on create db
        prepareScript: `
ALTER USER user_${process.env.CI_COMMIT_SHORT_SHA} with CREATEROLE;
GRANT anonymous TO user_${process.env.CI_COMMIT_SHORT_SHA};
      `,
      },
      env,
    });
  }

  return [];
};
