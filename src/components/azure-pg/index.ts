import type { Environment } from "@kosko/env";
import gitlab from "@socialgouv/kosko-charts/environments/gitlab";
import { assertEnv } from "@socialgouv/kosko-charts/utils/assertEnv";

import type { DeploymentParams } from "../../utils/createDeployment";
import { getPgServerHostname } from "../../utils/getPgServerHostname";
import { updateMetadata } from "../../utils/updateMetadata";
import { createSecret } from "../pg-secret";
import { createDbJob } from "./create-db.job";
import { getDevDatabaseParameters } from "./params";
import type { PgParams } from "./types";

//const assert = assertEnv(["CI_COMMIT_SHORT_SHA", "CI_PROJECT_NAME"]);

export const getDefaultPgParams = (
  config: Partial<CreateConfig> = {}
): PgParams => {
  //assert(process.env);

  const { GITHUB_SHA, GITHUB_REPOSITORY } = process.env as Record<
    string,
    string
  >;

  const sha = GITHUB_SHA.slice(0, 7);
  const projectName = GITHUB_REPOSITORY.split("/")[1];

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

export const create = ({ config = {} }: CreateParams): { kind: string }[] => {
  const defaultParams = getDefaultPgParams(config);

  // kosko component env values
  const envParams = {
    ...defaultParams, // set name as default if not provided
    ...gitlab(process.env),
    ...config, // create options
  };

  const job = createDbJob(defaultParams);
  updateMetadata(job, {
    annotations: envParams.annotations ?? {},
    labels: envParams.labels ?? {},
    name: `create-db-job-${process.env.GITHUB_SHA?.slice(0, 7)}`,
    namespace: envParams.namespace,
  });

  const secret = createSecret(envParams);
  updateMetadata(secret, {
    annotations: envParams.annotations ?? {},
    labels: envParams.labels ?? {},
    name: defaultParams.name,
    namespace: envParams.namespace,
  });

  return [job, secret];
};
