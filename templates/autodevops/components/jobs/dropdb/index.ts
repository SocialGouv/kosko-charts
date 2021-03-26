import { dropDbJob } from "@socialgouv/kosko-charts/components/azure-pg/drop-db.job";
import { getDevDatabaseParameters } from "@socialgouv/kosko-charts/components/azure-pg/params";
import { ok } from "assert";

const suffix = process.env.ENVIRONMENT_SLUG ?? process.env.CI_ENVIRONMENT_SLUG;

ok(
  suffix,
  "Missing `suffix` user/database suffix to drop." +
    "You might want to provide it as ENVIRONMENT_SLUG"
);

export default dropDbJob(
  // HACK(douglasduteil): native gitlab ci/cd "support"
  // The CI_ENVIRONMENT_SLUG contants "-"
  // Postrges doesn't like "-" on user/database names
  getDevDatabaseParameters({ suffix: suffix.replace(/-/g, "") })
);
