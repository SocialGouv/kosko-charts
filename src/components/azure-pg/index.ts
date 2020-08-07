import { Environment } from "@kosko/env";
import { SealedSecret } from "@kubernetes-models/sealed-secrets/bitnami.com/v1alpha1/SealedSecret";
import { ok } from "assert";

import gitlab from "../../environments/gitlab";
import { DeploymentParams } from "../../utils/createDeployment";
import { loadYaml } from "../../utils/getEnvironmentComponent";
import { getPgServerHostname } from "../../utils/getPgServerHostname";
import { updateMetadata } from "../../utils/updateMetadata";
import { createSecret } from "../pg-secret/create";
import { createDbJob } from "./create-db.job";

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
  ok(process.env.CI_PROJECT_NAME, "Missing process.env.CI_PROJECT_NAME");
  const sha = process.env.CI_COMMIT_SHORT_SHA;
  const projectName = process.env.CI_PROJECT_NAME;

  return {
    database: `autodevops_${sha}`,
    host: config.pgHost ?? getPgServerHostname(projectName, "dev"),
    name: `azure-pg-user-${sha}`,
    password: `password_${sha}`,
    user: `user_${sha}`,
  };
};

export interface CreateConfig extends DeploymentParams {
  pgHost?: string;
}

interface CreateParams {
  env: Environment;
  config?: Partial<CreateConfig>;
}

export const create = ({ env, config = {} }: CreateParams): unknown[] => {
  const defaultParams = getDefaultPgParams(config);

  // kosko component env values
  const envParams = {
    ...defaultParams, // set name as default if not provided
    ...gitlab(process.env),
    ...config, // create options
  };

  /* SEALED-SECRET */
  // try to import environment sealed-secret
  const sealedSecret = loadYaml<SealedSecret>(env, `pg.sealed-secret.yaml`);
  ok(sealedSecret, "Missing pg.sealed-secret.yaml");
  // add gitlab annotations
  updateMetadata(sealedSecret, {
    annotations: envParams.annotations ?? {},
    labels: envParams.labels ?? {},
    namespace: envParams.namespace,
  });
  // add to deployment.envFrom

  const job = createDbJob(defaultParams);
  updateMetadata(job, {
    annotations: envParams.annotations ?? {},
    labels: envParams.labels ?? {},
    name: `create-db-job-${process.env.CI_COMMIT_SHORT_SHA}`,
    namespace: envParams.namespace,
  });

  const secret = createSecret(envParams);
  updateMetadata(secret, {
    annotations: envParams.annotations ?? {},
    labels: envParams.labels ?? {},
    name: defaultParams.name,
    namespace: envParams.namespace,
  });
  return [sealedSecret, job, secret];
};
