import { ok } from "assert";

type EnvironmentName = "dev" | "preprod" | "prod";

// dummy slugify - use "dev" server for "preprod" env too
export const getPgServerHostName = (
  appName: string,
  env: EnvironmentName = "dev"
): string =>
  appName.toLowerCase().replace(/\W/g, "") +
  (env === "preprod" ? "dev" : env) +
  "server.postgres.database.azure.com";

ok(
  getPgServerHostName("sample-Next-App123", "preprod") ===
    "samplenextappdevserver.postgres.database.azure.com"
);
