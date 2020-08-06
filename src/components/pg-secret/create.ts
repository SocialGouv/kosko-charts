import { Secret } from "kubernetes-models/v1/Secret";

// create the azure-pg-user secret for dynamic environments (dev)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createSecret = ({
  database = "",
  user = "",
  password = "",
  host = "",
  sslmode = "require",
}): Secret => {
  const connectionString = `postgresql://${user}%40${host}:${password}@${host}/${database}?sslmode=require`.toString();
  const secret = new Secret({
    metadata: {
      // ...metadataFromParams(params),
    },
    stringData: {
      DATABASE_URL: connectionString,
      DB_URI: connectionString,
      HASURA_GRAPHQL_DATABASE_URL: connectionString,
      PGDATABASE: database,
      PGHOST: host,
      PGPASSWORD: password,
      PGRST_DB_URI: connectionString,
      PGSSLMODE: sslmode,
      PGUSER: `${user}@${host}`,
    },
  });
  return secret;
};
