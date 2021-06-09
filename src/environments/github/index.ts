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
  const branchName = GITHUB_REF.split("/").pop();
  const environmentSlug = slugify(branchName ?? shortSha);
  const domain = SOCIALGOUV_KUBE_INGRESS_BASE_DOMAIN;
  const projectName = GITHUB_REPOSITORY.split("/")[1];

  const isProduction = Boolean(SOCIALGOUV_PRODUCTION);
  const isPreProduction = Boolean(SOCIALGOUV_PREPRODUCTION);

  const devNamespace = `${projectName}-${environmentSlug}`;
  const preProductionNamespace = `${projectName}-preprod`;
  const productionNamespace = SOCIALGOUV_PRODUCTION_NAMESPACE || projectName;

  const namespaceName = isProduction
    ? productionNamespace
    : isPreProduction
    ? preProductionNamespace
    : devNamespace;

  const subdomain = isProduction
    ? projectName
    : isPreProduction
    ? `${projectName}-preprod`
    : devNamespace;

  const clusterEnv = SOCIALGOUV_PRODUCTION ? "prod2" : "dev2";

  // const application = `${projectName}-${clusterEnv}-${
  //   isProduction ? "prod" : isPreProduction ? "preprod" : branchName
  // }`;

  const application = projectName;

  return {
    annotations: {
      "app.github.com/job": GITHUB_JOB,
      "app.github.com/ref": GITHUB_REF,
      "app.github.com/repo": GITHUB_REPOSITORY,
      "app.github.com/run": GITHUB_RUN_ID,
      "app.github.com/sha": shortSha,
    },
    domain,
    git: {
      branch: GITHUB_REF,
      remote: GITHUB_REPOSITORY,
    },
    labels: {
      application,
      owner: projectName,
      team: projectName,
      ...(clusterEnv === "dev2" ? { cert: "wildcard" } : {}),
    },
    namespace: {
      name: namespaceName,
    },
    subdomain,
  };
};
