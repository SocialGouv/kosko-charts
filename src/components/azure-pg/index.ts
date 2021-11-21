import type { Environment } from "@kosko/env";
import type { ISealedSecret } from "@kubernetes-models/sealed-secrets/bitnami.com/v1alpha1/SealedSecret";
import { SealedSecret } from "@kubernetes-models/sealed-secrets/bitnami.com/v1alpha1/SealedSecret";
import environments from "@socialgouv/kosko-charts/environments";
import { merge } from "@socialgouv/kosko-charts/utils/@kosko/env/merge";
import type { DeploymentParams } from "@socialgouv/kosko-charts/utils/createDeployment";
import { generate } from "@socialgouv/kosko-charts/utils/environmentSlug";
import { loadYaml } from "@socialgouv/kosko-charts/utils/getEnvironmentComponent";
import { getPgServerHostname } from "@socialgouv/kosko-charts/utils/getPgServerHostname";
import { updateMetadata } from "@socialgouv/kosko-charts/utils/updateMetadata";
import { cryptFromSecrets } from "@socialgouv/sre-seal";

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

  return {
    ...getDevDatabaseParameters({
      suffix,
    }),
    host: config.pgHost ?? getPgServerHostname(projectName, "dev"),
    name: `azure-pg-user-${suffix}`,
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

  const job = createDbJob(defaultParams);
  updateMetadata(job, {
    annotations: envParams.annotations,
    labels: envParams.labels ?? {},
    name: generate(`create-db-job-${ciEnv.branch}`),
    namespace: envParams.namespace,
  });

  delete job.spec?.template.metadata;

  const sealedSecretDefinition = (await cryptFromSecrets({
    context: "dev",
    name: defaultParams.name,
    namespace: envParams.namespace.name,
    secrets: {
      database: defaultParams.database,
      host: defaultParams.host,
      password: defaultParams.password,
      user: defaultParams.user,
    },
  })) as ISealedSecret;

  const sealedSecret = new SealedSecret(sealedSecretDefinition);

  return [job, sealedSecret];
};
