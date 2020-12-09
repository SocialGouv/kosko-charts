interface GitlabEnvParams {
  project: string;
  env: "dev" | "preprod" | "prod";
}

type AnyObject = { [key: string]: string };

export function getGitlabEnv({ project, env }: GitlabEnvParams): AnyObject {
  const variables: AnyObject = {
    CI_COMMIT_BEFORE_SHA: "0000000000000000000000000000000000000000",
    CI_COMMIT_DESCRIPTION: "",
    CI_COMMIT_MESSAGE: "feat: some feature",
    CI_COMMIT_REF_NAME: "e2e-branch",
    CI_COMMIT_REF_PROTECTED: "false",
    CI_COMMIT_REF_SLUG: "e2e-branch",
    CI_COMMIT_SHA: "8843083edb7f873cad1d1420731a60773594ffae",
    CI_COMMIT_SHORT_SHA: "8843083",
    CI_COMMIT_TAG: "",
    CI_COMMIT_TIMESTAMP: "2020-11-25T09:43:54+00:00",
    CI_COMMIT_TITLE: "chore(release): version 1.2.3",
    CI_PROJECT_DIR: `/builds/SocialGouv/${project}`,
    CI_PROJECT_ID: "24",
    CI_PROJECT_NAME: `${project}`,
    CI_PROJECT_NAMESPACE: "SocialGouv",
    CI_PROJECT_PATH: `SocialGouv/${project}`,
    CI_PROJECT_PATH_SLUG: `socialgouv-${project}`,
    CI_PROJECT_ROOT_NAMESPACE: "SocialGouv",
    CI_PROJECT_TITLE: `${project}`,
    CI_PROJECT_URL: `https://gitlab.factory.social.gouv.fr/SocialGouv/${project}`,
    CI_PROJECT_VISIBILITY: "public",
    CI_REGISTRY_IMAGE: `registry.gitlab.factory.social.gouv.fr/socialgouv/${project}`,
    CI_REGISTRY_USER: "gitlab-ci-token",
    CI_REPOSITORY_URL: `https://gitlab-ci-token:[MASKED]@gitlab.factory.social.gouv.fr/SocialGouv/${project}.git`,
    KUBE_INGRESS_BASE_DOMAIN: "dev2.fabrique.social.gouv.fr",
    KUBE_NAMESPACE: `${project}-24-e2e-branch`,
    PRODUCTION: "",
  };

  variables.CI_ENVIRONMENT_NAME =
    env === "prod"
      ? "prod2"
      : env === "preprod"
      ? "preprod-dev2"
      : `${project}-${variables.CI_COMMIT_REF_SLUG}-dev2`;
  variables.CI_ENVIRONMENT_SLUG = variables.CI_ENVIRONMENT_NAME;

  if (env === "dev") {
    variables.CI_ENVIRONMENT_URL = `https://${variables.CI_COMMIT_REF_SLUG}-dev2-${project}.${variables.KUBE_INGRESS_BASE_DOMAIN}`;
  } else if (env === "prod") {
    variables.KUBE_INGRESS_BASE_DOMAIN = "prod2.fabrique.social.gouv.fr";
    variables.KUBE_NAMESPACE = project;
    variables.PRODUCTION = "true";
    variables.CI_COMMIT_TAG = "1.2.3";
    variables.CI_COMMIT_MESSAGE = "chore(release): version 1.2.3";
    variables.CI_COMMIT_REF_NAME = "v1.2.3";
    variables.CI_COMMIT_REF_SLUG = "v1-2-3";
    variables.CI_COMMIT_TITLE = "chore(release): version 1.2.3";
    variables.CI_ENVIRONMENT_URL = `https://${project}.${variables.KUBE_INGRESS_BASE_DOMAIN}`;
  } else if (env === "preprod") {
    variables.KUBE_NAMESPACE = `${project}-${variables.CI_PROJECT_ID}-preprod-dev2`;
    variables.CI_COMMIT_TAG = "1.2.3";
    variables.CI_COMMIT_MESSAGE = "chore(release): version 1.2.3";
    variables.CI_COMMIT_REF_NAME = "v1.2.3";
    variables.CI_COMMIT_REF_SLUG = "v1-2-3";
    variables.CI_COMMIT_TITLE = "chore(release): version 1.2.3";
    variables.CI_ENVIRONMENT_URL =
      "https://preprod-${project}.${variables.KUBE_INGRESS_BASE_DOMAIN}";
  }
  return variables;
}
