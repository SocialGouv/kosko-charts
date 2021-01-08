export type EnvironmentName = "dev" | "preprod" | "prod";

/**
 *
 * This function will return the default postgres server hostname for a given app name and environnement
 *
 * ```typescript
 * import { getPgServerHostname } from "@socialgouv/kosko-charts/utils"
 *
 * const hostname = getPgServerHostname("app-admin", "prod");
 * ```
 * @category utils
 * @return {ManifestType}
 */
export const getPgServerHostname = (
  appName: string,
  env: EnvironmentName = "dev"
): string =>
  appName.toLowerCase().replace(/\W/g, "") +
  (env !== "prod" ? "dev" : "prod") +
  "server.postgres.database.azure.com";
// dummy slugify - use "dev" server for "preprod" env too
