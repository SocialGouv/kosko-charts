import { getDevDatabaseParameters } from "@socialgouv/kosko-charts/components/azure-pg/params";
import { addInitContainer } from "@socialgouv/kosko-charts/utils/addInitContainer";
import { ok } from "assert";
import { IIoK8sApiCoreV1Container } from "kubernetes-models/_definitions/IoK8sApiCoreV1Container";
import { Deployment } from "kubernetes-models/apps/v1/Deployment";

ok(process.env.CI_COMMIT_SHORT_SHA);

const getPostgresContainer = (
  props?: IIoK8sApiCoreV1Container
): IIoK8sApiCoreV1Container => {
  return {
    envFrom: [
      {
        secretRef: {
          name: `azure-pg-admin-user`,
        },
      },
    ],
    image: "postgres:10",
    imagePullPolicy: "IfNotPresent",
    name: "postgres",
    resources: {
      limits: {
        cpu: "300m",
        memory: "256Mi",
      },
      requests: {
        cpu: "100m",
        memory: "64Mi",
      },
    },
    ...props,
  };
};

const getSqlCreateUser = ({
  database,
  user,
  password,
}: {
  database: string;
  user: string;
  password: string;
}): string => `
DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles WHERE  rolname = '${user}') THEN

      SET timezone TO 'Europe/Paris';
      CREATE USER "${user}" WITH PASSWORD '${password}';
      GRANT ALL PRIVILEGES ON DATABASE "${database}" TO "${user}";
      GRANT USAGE ON SCHEMA public TO "${user}";
      GRANT ALL ON ALL TABLES IN SCHEMA public TO "${user}";
      GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO "${user}";
      ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO "${user}";

      CREATE EXTENSION IF NOT EXISTS "pgcrypto";
      CREATE EXTENSION IF NOT EXISTS "hstore";
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      CREATE EXTENSION IF NOT EXISTS "citext";
   END IF;
END
$do$;
`;

export const addCreateDbInitContainer = (
  deployment: Deployment
): Deployment => {
  ok(process.env.CI_COMMIT_SHORT_SHA);
  const databaseParameters = getDevDatabaseParameters({
    suffix: process.env.CI_COMMIT_SHORT_SHA,
  });

  const createDbContainer = getPostgresContainer({
    command: [
      "sh",
      "-c",
      `psql -e --dbname postgres -c "CREATE DATABASE ${databaseParameters.database};"; exit 0`,
    ],
    name: "create-db",
  });

  const createUserContainer = getPostgresContainer({
    command: [
      "psql",
      "-e",
      "--dbname",
      databaseParameters.database,
      "-c",
      getSqlCreateUser(databaseParameters),
    ],
    name: "create-user",
  });

  // create the database
  addInitContainer(deployment, createDbContainer);
  // create user
  addInitContainer(deployment, createUserContainer);

  return deployment;
};
