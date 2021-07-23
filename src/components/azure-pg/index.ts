import type { Environment } from "@kosko/env";
import environments from "@socialgouv/kosko-charts/environments";

import type { DeploymentParams } from "../../utils/createDeployment";
import { getPgServerHostname } from "../../utils/getPgServerHostname";
import { updateMetadata } from "../../utils/updateMetadata";
import { createSecret } from "../pg-secret";
import { createDbJob } from "./create-db.job";
import { getDevDatabaseParameters } from "./params";
import type { PgParams } from "./types";

export const getDefaultPgParams = (
  config: Partial<CreateConfig> = {}
): PgParams => {
  const ciEnv = environments(process.env);
  const sha = ciEnv.shortSha;
  const projectName = ciEnv.projectName;

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
  const ciEnv = environments(process.env);

  const defaultParams = getDefaultPgParams(config);

  // kosko component env values
  const envParams = {
    ...defaultParams, // set name as default if not provided
    ...ciEnv.metadata,
    ...config, // create options
  };

  const job = createDbJob(defaultParams);
  updateMetadata(job, {
    annotations: envParams.annotations ?? {},
    labels: envParams.labels ?? {},
    name: `create-db-job-${ciEnv.shortSha}`,
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
