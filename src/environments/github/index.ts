import type { CIEnv } from "@socialgouv/kosko-charts/types";
import { assertEnv } from "@socialgouv/kosko-charts/utils/assertEnv";
import { generate } from "@socialgouv/kosko-charts/utils/environmentSlug";

const assert = assertEnv([
  "GITHUB_SHA",
  "GITHUB_REF",
  "GITHUB_JOB",
  "GITHUB_RUN_ID",
  // "KUBE_NAMESPACE",
  "GITHUB_REPOSITORY",
  "SOCIALGOUV_BASE_DOMAIN",
]);

export default (env = process.env): CIEnv => {
  assert(env);

  const {
    GITHUB_SHA,
    GITHUB_REF,
    GITHUB_JOB,
    GITHUB_RUN_ID,
    GITHUB_REPOSITORY,
    // KUBE_NAMESPACE,
    SOCIALGOUV_BASE_DOMAIN,
    // NOTE(douglasduteil): enforce defined string in process.env
    // Those env variables are asserted to be defined above
  } = env as Record<string, string>;

  const {
    RANCHER_PROJECT_ID,
    SOCIALGOUV_PRODUCTION,
    SOCIALGOUV_PREPRODUCTION,
  } = env;

  const sha = GITHUB_SHA;
  const shortSha = GITHUB_SHA.slice(0, 7);
  const tag = GITHUB_REF.startsWith("refs/tags/")
    ? (GITHUB_REF.split("/").pop() ?? "").substring(1)
    : `sha-${GITHUB_SHA}`;

  const projectName = GITHUB_REPOSITORY.split("/")[1];

  const isProduction = Boolean(SOCIALGOUV_PRODUCTION);
  const isPreProduction = Boolean(SOCIALGOUV_PREPRODUCTION);

  const branchName = GITHUB_REF.replace("refs/heads/", "").replace(
    "refs/tags/",
    ""
  );

  const environmentSlug = generate(branchName);

  const productionNamespace = projectName;
  const preProductionNamespace = `${projectName}-preprod`;
  const devNamespace = `${projectName}-${environmentSlug}`;

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

  return {
    environment: environmentSlug,
    isPreProduction,
    isProduction,
    metadata: {
      annotations: {
        "app.github.com/job": GITHUB_JOB,
        "app.github.com/ref": GITHUB_REF,
        "app.github.com/repo": GITHUB_REPOSITORY,
        "app.github.com/run": GITHUB_RUN_ID,
        "app.github.com/sha": shortSha,
      },
      domain: SOCIALGOUV_BASE_DOMAIN,
      git: {
        branch: GITHUB_REF,
        remote: GITHUB_REPOSITORY,
      },
      labels: {
        application: projectName,
        owner: projectName,
        team: projectName,
        ...(!isProduction ? { cert: "wildcard" } : {}),
      },
      namespace: {
        name: namespaceName,
      },
      rancherId: RANCHER_PROJECT_ID ?? "",
      subdomain,
    },
    projectName,
    registry: `ghcr.io/socialgouv/${projectName}`,
    sha,
    shortSha,
    tag,
  };
};
