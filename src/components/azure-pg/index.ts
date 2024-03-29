import type { Environment } from "@kosko/env";
import type { SealedSecret } from "@kubernetes-models/sealed-secrets/bitnami.com/v1alpha1/SealedSecret";
import { generate } from "@socialgouv/env-slug";
import { createSecret } from "@socialgouv/kosko-charts/components/pg-secret";
import environments from "@socialgouv/kosko-charts/environments";
import { merge } from "@socialgouv/kosko-charts/utils/@kosko/env/merge";
import type { DeploymentParams } from "@socialgouv/kosko-charts/utils/createDeployment";
import { loadYaml } from "@socialgouv/kosko-charts/utils/getEnvironmentComponent";
import { getPgServerHostname } from "@socialgouv/kosko-charts/utils/getPgServerHostname";
import { updateMetadata } from "@socialgouv/kosko-charts/utils/updateMetadata";

import { createDbJob } from "./create-db.job";
import { getDevDatabaseParameters } from "./params";
import type { PgParams } from "./types";

export const PREPROD_PG_ENVIRONMENT = "preprod";

export const getDefaultPgParams = (
  config: Partial<CreateConfig> = {}
): PgParams => {
  const ciEnv = environments(process.env);

  const suffix = ciEnv.isPreProduction
    ? PREPROD_PG_ENVIRONMENT
    : ciEnv.branchSlug;
  const projectName = ciEnv.projectName;

  const pgUserSecretPrefix = process.env.PG_USER_SECRET_PREFIX
    ? process.env.PG_USER_SECRET_PREFIX
    : "azure-pg-user";

  return {
    ...getDevDatabaseParameters({
      suffix,
    }),
    host: config.pgHost ?? getPgServerHostname(projectName, "dev"),
    name: `${pgUserSecretPrefix}-${suffix}`,
    secretRefName:
      ciEnv.isProduction || ciEnv.isPreProduction
        ? `${pgUserSecretPrefix}`
        : `${pgUserSecretPrefix}-${suffix}`,
  };
};

export interface CreateConfig extends DeploymentParams {
  pgHost?: string;
}

interface CreateParams {
  env: Environment;
  config?: Partial<CreateConfig>;
}

export const create = async (
  name: string,
  { env, config = {} }: CreateParams
): Promise<{ kind: string }[]> => {
  const ciEnv = environments(process.env);

  // in prod/preprod, we try to add a fixed sealed-secret
  const existingSecret = await loadYaml<SealedSecret>(
    env,
    `${name}.sealed-secret.yaml`
  );

  if (existingSecret) {
    updateMetadata(existingSecret, {
      annotations: ciEnv.metadata.annotations ?? {},
      labels: ciEnv.metadata.labels ?? {},
      namespace: ciEnv.metadata.namespace,
    });

    return [existingSecret];
  }

  if (ciEnv.isProduction || ciEnv.isPreProduction) {
    throw new Error(`Missing envs/${env.env}/${name}.sealed-secret.yaml`);
  }
  // add gitlab annotations
  const defaultParams = getDefaultPgParams(config);

  // kosko component env values
  const envParams = merge(
    defaultParams, // set name as default if not provided
    {
      annotations: {
        "kapp.k14s.io/update-strategy": "skip",
      },
    },
    ciEnv.metadata,
    config // create options
  );

  const job = createDbJob({
    ...defaultParams,
    secretRefName: undefined,
  });

  updateMetadata(job, {
    annotations: envParams.annotations,
    labels: envParams.labels ?? {},
    name: generate(`create-db-job-${ciEnv.branch}`),
    namespace: envParams.namespace,
  });

  delete job.spec?.template.metadata;

  const secret = createSecret(envParams);
  updateMetadata(secret, {
    annotations: envParams.annotations,
    labels: envParams.labels ?? {},
    name: defaultParams.name,
    namespace: envParams.namespace,
  });

  return [job, secret];
};
