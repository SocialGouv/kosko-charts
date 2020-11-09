import { Environment } from "@kosko/env";
import gitlab from "@socialgouv/kosko-charts/environments/gitlab";
import { ok } from "assert";

import { DeploymentParams } from "../../utils/createDeployment";
import { getPgServerHostname } from "../../utils/getPgServerHostname";
import { updateMetadata } from "../../utils/updateMetadata";
import { addInitContainer } from "../../utils/addInitContainer";
import { waitForPostgres } from "../../utils/waitForPostgres";
import { createSecret } from "../pg-secret/create";
import { createDbJob } from "./create-db.job";
import { createPsqlJob } from "./create-psql.job";
import { getDevDatabaseParameters } from "./params";
import { EnvVar } from "kubernetes-models/v1/EnvVar";

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
  prepareScript?: string;
}

interface CreateParams {
  env: Environment;
  config?: Partial<CreateConfig>;
}

import { IoK8sApiCoreV1Container } from "kubernetes-models/_definitions/IoK8sApiCoreV1Container";

export const create = ({ config = {} }: CreateParams): unknown[] => {
  const defaultParams = getDefaultPgParams(config);

  const manifests = [];

  // kosko component env values
  const envParams = {
    ...defaultParams, // set name as default if not provided
    ...gitlab(process.env),
    ...config, // create options
  };

  const secretNamespace = { name: `${process.env.CI_PROJECT_NAME}-secret` };

  const createJob = createDbJob(defaultParams);
  updateMetadata(createJob, {
    annotations: envParams.annotations ?? {},
    labels: envParams.labels ?? {},
    name: `create-db-job-${process.env.CI_COMMIT_SHORT_SHA}`,
    namespace: secretNamespace,
  });
  manifests.push(createJob);

  // create a new job in the app-secret namespace with full rights on the DB
  if (config.prepareScript) {
    const prepareJob = createPsqlJob({
      database: `autodevops_${process.env.CI_COMMIT_SHORT_SHA}`,
      script: config.prepareScript,
    });

    // add an initContainer to wait for the create-db job to be complete
    const initContainer = new IoK8sApiCoreV1Container({
      image:
        "registry.gitlab.factory.social.gouv.fr/socialgouv/docker/kubectl:2.2.0",
      name: `init-prepare-db-${process.env.CI_COMMIT_SHORT_SHA}`,
      command: [
        "kubectl",
        "wait",
        "--timeout",
        "120",
        "--namespace",
        secretNamespace.name,
        "--for=condition=complete",
        `jobs/create-db-job-${process.env.CI_COMMIT_SHORT_SHA}`,
      ],
    });

    ok(prepareJob.spec);
    ok(prepareJob.spec.template.spec);
    prepareJob.spec.template.spec.initContainers = [initContainer];

    updateMetadata(prepareJob, {
      annotations: envParams.annotations ?? {},
      labels: envParams.labels ?? {},
      name: `prepare-db-job-${process.env.CI_COMMIT_SHORT_SHA}`,
      namespace: secretNamespace,
    });

    manifests.push(prepareJob);
  }

  // create a PG user secret in branch namespace
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
