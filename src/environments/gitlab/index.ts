import type { CIEnv } from "@socialgouv/kosko-charts/types";
import { assertEnv } from "@socialgouv/kosko-charts/utils/assertEnv";

const assert = assertEnv([
  "CI_ENVIRONMENT_NAME",
  "CI_ENVIRONMENT_SLUG",
  "CI_PROJECT_NAME",
  "CI_PROJECT_PATH_SLUG",
  "KUBE_INGRESS_BASE_DOMAIN",
  "KUBE_NAMESPACE",
  "CI_COMMIT_SHORT_SHA",
]);

export default (env = process.env): CIEnv => {
  assert(env);

  const {
    CI_ENVIRONMENT_NAME,
    CI_ENVIRONMENT_SLUG,
    CI_PROJECT_NAME,
    CI_PROJECT_PATH_SLUG,
    KUBE_INGRESS_BASE_DOMAIN,
    KUBE_NAMESPACE,
    CI_COMMIT_SHORT_SHA,
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
  const isProduction = Boolean(PRODUCTION);
  const isPreProduction = /^preprod-dev\d*$/.test(CI_ENVIRONMENT_NAME);
  const application = isProduction
    ? CI_PROJECT_NAME
    : CI_COMMIT_TAG
    ? `${CI_COMMIT_TAG.replace(/\./g, "-")}-${CI_PROJECT_NAME}`
    : `${CI_ENVIRONMENT_SLUG}-${CI_PROJECT_NAME}`;

  const subdomain = isProduction
    ? CI_PROJECT_NAME
    : isPreProduction
    ? `preprod-${CI_PROJECT_NAME}`
    : application;

  const namespaceName = isProduction
    ? PRODUCTION_NAMESPACE ?? CI_PROJECT_NAME
    : KUBE_NAMESPACE;

  const tag = process.env.CI_COMMIT_TAG
    ? process.env.CI_COMMIT_TAG.slice(1)
    : process.env.CI_COMMIT_SHA;

  return {
    isPreProduction,
    isProduction,
    metadata: {
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
        ...(/-dev\d*$/.test(CI_ENVIRONMENT_NAME) ? { cert: "wildcard" } : {}),
      },
      namespace: {
        name: namespaceName,
      },
      rancherId: RANCHER_PROJECT_ID ?? "",
      subdomain,
    },
    projectName: CI_PROJECT_NAME,
    shortSha: CI_COMMIT_SHORT_SHA,
    tag,
  };
};
