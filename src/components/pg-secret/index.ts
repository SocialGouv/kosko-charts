import { isNotEmptyString } from "@socialgouv/kosko-charts/utils/assertEnv";
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
export const createSecret = ({
  database: PGDATABASE,
  user,
  password: PGPASSWORD,
  host: PGHOST,
  sslmode,
}: SecretParams): Secret => {
  ok(!isNotEmptyString(PGDATABASE), "A database should be defined");
  ok(!isNotEmptyString(user), "A user should be defined");
  ok(!isNotEmptyString(PGPASSWORD), "A password should be defined");
  ok(!isNotEmptyString(PGHOST), "A host should be defined");

  const PGSSLMODE = sslmode ?? "require";
  const PGUSER = `${user}@${PGHOST}`;
  const connectionString = `postgresql://${user}%40${PGHOST}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=${PGSSLMODE}`;
  const secret = new Secret({
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
