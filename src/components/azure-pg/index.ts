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
export const getDefaultPgParams = (): PgParams => {
  ok(process.env.CI_PROJECT_NAME, "Missing process.env.CI_PROJECT_NAME");
  const sha = process.env.CI_COMMIT_SHORT_SHA;
  const projectName = process.env.CI_PROJECT_NAME;

  return {
    database: `autodevops_${sha}`,
    host: getPgServerHostname(projectName, "dev"),
    name: `azure-pg-user-${sha}`,
    password: `password_${sha}`,
    user: `user_${sha}`,
  };
};

export type CreateConfig = DeploymentParams;

interface CreateParams {
  env: Environment;
  config?: Partial<CreateConfig>;
}

export const create = ({ env, config = {} }: CreateParams): unknown[] => {
  const defaultParams = getDefaultPgParams();
  const manifests = [];

  // kosko component env values
  const envParams = {
    ...defaultParams, // set name as default if not provided
    ...gitlab(process.env),
    ...config, // create options
  };

  /* SEALED-SECRET */
  // in dev, the secret is created dynamically (by create-db), no nead to read a local sealed secret
  // try to import environment sealed-secret
  const sealedSecret = loadYaml<SealedSecret>(env, `pg.sealed-secret.yaml`);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!sealedSecret) {
    throw Error("WARN: Missing pg.sealed-secret.yaml");
  }
  // add gitlab annotations
  updateMetadata(sealedSecret, {
    annotations: envParams.annotations ?? {},
    labels: envParams.labels ?? {},
    namespace: envParams.namespace,
  });
  manifests.push(sealedSecret);

  const job = createDbJob(defaultParams);
  updateMetadata(job, {
    annotations: envParams.annotations ?? {},
    labels: envParams.labels ?? {},
    name: `create-db-job-${process.env.CI_COMMIT_SHORT_SHA}`,
    namespace: envParams.namespace,
  });
  manifests.push(job);

  const secret = createSecret(envParams);
  updateMetadata(secret, {
    annotations: envParams.annotations ?? {},
    labels: envParams.labels ?? {},
    name: defaultParams.name,
    namespace: envParams.namespace,
  });
  manifests.push(secret);

  return manifests;
};
