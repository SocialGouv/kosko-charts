import ci from "@socialgouv/kosko-charts/environments";
import { isNotEmptyString } from "@socialgouv/kosko-charts/utils/assertEnv";
import { generate } from "@socialgouv/kosko-charts/utils/environmentSlug";
import { ok } from "assert";
import { Secret } from "kubernetes-models/v1/Secret";

export interface SecretParams {
  database: string;
  user: string;
  password: string;
  host: string;
  sslmode?: string;
}

// create the azure-pg-user secret for dynamic environments (dev)
export const createSecret = (
  name: string,
  {
    database: PGDATABASE,
    user,
    password: PGPASSWORD,
    host: PGHOST,
    sslmode,
  }: SecretParams
): Secret => {
  ok(!isNotEmptyString(PGDATABASE), "A database should be defined");
  ok(!isNotEmptyString(user), "A user should be defined");
  ok(!isNotEmptyString(PGPASSWORD), "A password should be defined");
  ok(!isNotEmptyString(PGHOST), "A host should be defined");

  const env = ci(process.env);

  const PGSSLMODE = sslmode ?? "require";
  const PGUSER = `${user}@${PGHOST}`;
  const connectionString = `postgresql://${user}%40${PGHOST}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=${PGSSLMODE}`;
  const secret = new Secret({
    metadata: {
      annotations: env.metadata.annotations,
      labels: env.metadata.labels,
      name: generate(name),
      namespace: env.metadata.namespace.name,
    },
    stringData: {
      DATABASE_URL: connectionString,
      DB_URI: connectionString,
      HASURA_GRAPHQL_DATABASE_URL: connectionString,
      PGDATABASE,
      PGHOST,
      PGPASSWORD,
      PGRST_DB_URI: connectionString,
      PGSSLMODE,
      PGUSER,
    },
  });
  return secret;
};
