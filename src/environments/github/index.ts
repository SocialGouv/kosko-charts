import type { GlobalEnvironment } from "@socialgouv/kosko-charts/types";
import { assertEnv } from "@socialgouv/kosko-charts/utils/assertEnv";
import slugify from "slugify";

// https://docs.github.com/en/actions/reference/environment-variables
const assert = assertEnv([
  "GITHUB_RUN_ID",
  "GITHUB_JOB",
  "GITHUB_REPOSITORY",
  "GITHUB_SHA",
  "SOCIALGOUV_KUBE_INGRESS_BASE_DOMAIN",
]);

export default (env = process.env): GlobalEnvironment => {
  assert(env);

  const {
    // From Github
    GITHUB_RUN_ID,
    GITHUB_JOB,
    GITHUB_REPOSITORY,
    GITHUB_SHA,
    GITHUB_REF,
    // Additional
    SOCIALGOUV_KUBE_INGRESS_BASE_DOMAIN,
    SOCIALGOUV_PRODUCTION_NAMESPACE,
    SOCIALGOUV_PRODUCTION,
    SOCIALGOUV_PREPRODUCTION,
  } = env as Record<string, string>;

  const shortSha = GITHUB_SHA.slice(0, 7);
  const environmentSlug = slugify(GITHUB_REF || shortSha);
  const domain = SOCIALGOUV_KUBE_INGRESS_BASE_DOMAIN;
  const projectName = GITHUB_REPOSITORY.split("/")[1];

  const isProduction = Boolean(SOCIALGOUV_PRODUCTION);
  const isPreProduction = Boolean(SOCIALGOUV_PREPRODUCTION);

  const devNamespace = `${environmentSlug}-${projectName}`;
  const preProductionNamespace = `preprod-${projectName}`;
  const productionNamespace = SOCIALGOUV_PRODUCTION_NAMESPACE || projectName;

  const namespaceName = isProduction
    ? productionNamespace
    : isPreProduction
    ? preProductionNamespace
    : devNamespace;

  const subdomain = isProduction ? projectName : devNamespace;

  return {
    annotations: {},
    domain,
    git: {
      branch: GITHUB_REF,
      remote: GITHUB_REPOSITORY,
    },
    labels: {
      "app.github.com/job": GITHUB_JOB,
      "app.github.com/ref": GITHUB_REF,
      "app.github.com/repo": GITHUB_REPOSITORY,
      "app.github.com/run": GITHUB_RUN_ID,
      "app.github.com/sha": shortSha,
    },
    namespace: {
      name: namespaceName,
    },
    subdomain,
  };
};
