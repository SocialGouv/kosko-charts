type EnvironmentName = "dev" | "preprod" | "prod";

// dummy slugify - use "dev" server for "preprod" env too
export const getPgServerHostname = (
  appName: string,
  env: EnvironmentName = "dev"
): string =>
  appName.toLowerCase().replace(/\W/g, "") +
  (env !== "prod" ? "dev" : "prod") +
  "server.postgres.database.azure.com";
