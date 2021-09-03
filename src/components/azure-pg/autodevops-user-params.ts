import ci from "@socialgouv/kosko-charts/environments";
import { getPgServerHostname } from "@socialgouv/kosko-charts/utils";

import { getDevDatabaseParameters } from "./params";
import type { PgParams } from "./types";

/**
 * This function will returns pg parametter for auto
 *
 * ```typescript
 * import { autodevopsPgUserParams } from "@socialgouv/components/azure-pg"

 * const pgMasterUserParams = autodevopsPgUserParams("master");
 * ```
 * @category components
 * @return {PgParams}
 */
export const autodevopsPgUserParams = (suffix: string): PgParams => {
  const ciEnv = ci(process.env);
  const projectName = ciEnv.projectName;
  return {
    ...getDevDatabaseParameters({ suffix }),
    host: getPgServerHostname(projectName, "dev"),
    name: `azure-pg-user-${suffix}`,
  } as PgParams;
};
