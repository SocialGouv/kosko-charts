//import { create as createDb } from "@socialgouv/kosko-charts/components/azure-db";
import { SealedSecret } from "@kubernetes-models/sealed-secrets/bitnami.com/v1alpha1/SealedSecret";
import { ok } from "assert";

import gitlab from "../../environments/gitlab";
import { loadYaml } from "../../utils/getEnvironmentComponent";
import { getPgServerHostname } from "../../utils/getPgServerHostname";
import { updateMetadata } from "../../utils/updateMetadata";
import { createSecret } from "../pg-secret/create";
import { createDbJob } from "./create-db.job";

//const { createDbJob } = createDb(params);
//const { createSecret: secret } = createSecret(params);

const getDefaultPgParams = () => {
  ok(process.env.CI_PROJECT_NAME);
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
//@ts-expect-error
export const create = ({ env, config }) => {
  const defaultParams = getDefaultPgParams();

  // kosko component env values
  const envParams = {
    ...defaultParams, // set name as default if not provided
    ...gitlab(process.env),
    ...config, // create options
  };

  /* SEALED-SECRET */
  // try to import environment sealed-secret
  const sealedSecret = loadYaml<SealedSecret>(
    env,
    `azure-pg.sealed-secret.yaml`
  );
  // add gitlab annotations
  updateMetadata(sealedSecret, {
    annotations: envParams.annotations,
    labels: envParams.labels,
    namespace: envParams.namespace,
  });
  // add to deployment.envFrom

  const job = createDbJob(defaultParams);
  updateMetadata(job, {
    annotations: envParams.annotations,
    labels: envParams.labels,
    name: `create-db-job-${process.env.CI_COMMIT_SHORT_SHA}`,
    namespace: envParams.namespace,
  });

  const secret = createSecret(envParams);
  updateMetadata(secret, {
    annotations: envParams.annotations,
    labels: envParams.labels,
    name: defaultParams.name,
    namespace: envParams.namespace,
  });
  return [sealedSecret, job, secret];
};
