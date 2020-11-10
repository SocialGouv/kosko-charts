import { Environment } from "@kosko/env";
import gitlab from "@socialgouv/kosko-charts/environments/gitlab";
import { ok } from "assert";

import { DeploymentParams } from "../../utils/createDeployment";
import { getPgServerHostname } from "../../utils/getPgServerHostname";
import { updateMetadata } from "../../utils/updateMetadata";
import { createSecret } from "../pg-secret/create";
import { createDbJob } from "./create-db.job";
import { getDevDatabaseParameters } from "./params";

interface PgParams {
  database: string;
  host: string;
  user: string;
  password: string;
  name: string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const getDefaultPgParams = (
  config: Partial<CreateConfig> = {}
): PgParams => {
  ok(
    process.env.CI_COMMIT_SHORT_SHA,
    "Missing process.env.CI_COMMIT_SHORT_SHA"
  );
  ok(process.env.CI_PROJECT_NAME, "Missing process.env.CI_PROJECT_NAME");

  const {
    CI_COMMIT_SHORT_SHA: sha,
    CI_PROJECT_NAME: projectName,
    // NOTE(douglasduteil): enforce defined string in process.env
    // Those env variables are asserted to be defined above
  } = process.env as Record<string, string>;

  return {
    ...getDevDatabaseParameters({
      suffix: sha,
    }),
    host: config.pgHost ?? getPgServerHostname(projectName, "dev"),
    name: `azure-pg-user-${sha}`,
  };
};

export interface CreateConfig extends DeploymentParams {
  pgHost?: string;
}

interface CreateParams {
  env: Environment;
  config?: Partial<CreateConfig>;
}

export const create = ({ config = {} }: CreateParams): unknown[] => {
  const defaultParams = getDefaultPgParams(config);

  // kosko component env values
  const envParams = {
    ...defaultParams, // set name as default if not provided
    ...gitlab(process.env),
    ...config, // create options
  };

  const secret = createSecret(envParams);
  updateMetadata(secret, {
    annotations: envParams.annotations ?? {},
    labels: envParams.labels ?? {},
    name: defaultParams.name,
    namespace: envParams.namespace,
  });
  return [secret];
};
