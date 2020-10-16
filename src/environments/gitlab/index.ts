import { GlobalEnvironment } from "@socialgouv/kosko-charts/types";
import { assertEnv } from "@socialgouv/kosko-charts/utils/assertEnv";

const assert = assertEnv([
  "CI_ENVIRONMENT_NAME",
  "CI_ENVIRONMENT_SLUG",
  "CI_PROJECT_NAME",
  "CI_PROJECT_PATH_SLUG",
  "KUBE_INGRESS_BASE_DOMAIN",
  "KUBE_NAMESPACE",
]);
export default (env = process.env): GlobalEnvironment => {
  assert(env);

  const {
    CI_ENVIRONMENT_NAME,
    CI_ENVIRONMENT_SLUG,
    CI_PROJECT_NAME,
    CI_PROJECT_PATH_SLUG,
    KUBE_INGRESS_BASE_DOMAIN,
    KUBE_NAMESPACE,
    // NOTE(douglasduteil): enforce defined string in process.env
    // Those env variables are asserted to be defined above
  } = env as Record<string, string>;

  const {
    CI_COMMIT_REF_NAME,
    CI_COMMIT_TAG,
    CI_REPOSITORY_URL,
    PRODUCTION,
    PRODUCTION_NAMESPACE,
    RANCHER_PROJECT_ID,
  } = env;
  const isProductionCluster = Boolean(PRODUCTION);
  const isPreProduction = CI_ENVIRONMENT_NAME === "preprod-dev2";
  const application = isProductionCluster
    ? CI_PROJECT_NAME
    : CI_COMMIT_TAG
    ? `${CI_COMMIT_TAG.replace(/\./g, "-")}-${CI_PROJECT_NAME}`
    : `${CI_ENVIRONMENT_SLUG}-${CI_PROJECT_NAME}`;

  const subdomain = isProductionCluster
    ? CI_PROJECT_NAME
    : isPreProduction
    ? `preprod-${CI_PROJECT_NAME}`
    : application;

  const namespaceName = isProductionCluster
    ? PRODUCTION_NAMESPACE ?? CI_PROJECT_NAME
    : KUBE_NAMESPACE;

  return {
    annotations: {
      "app.gitlab.com/app": CI_PROJECT_PATH_SLUG,
      "app.gitlab.com/env": CI_ENVIRONMENT_SLUG,
      "app.gitlab.com/env.name": CI_ENVIRONMENT_NAME,
    },
    domain: KUBE_INGRESS_BASE_DOMAIN,
    git: {
      branch: CI_COMMIT_REF_NAME,
      remote: CI_REPOSITORY_URL,
    },
    labels: {
      application,
      //component: application,
      owner: CI_PROJECT_NAME,
      team: CI_PROJECT_NAME,
      ...(CI_ENVIRONMENT_NAME.endsWith("-dev2") ? { cert: "wildcard" } : {}),
    },
    namespace: {
      name: namespaceName,
    },
    rancherId: RANCHER_PROJECT_ID ?? "",
    subdomain,
  };
};
