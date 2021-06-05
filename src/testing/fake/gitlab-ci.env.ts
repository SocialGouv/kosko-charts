export const project = (
  CI_PROJECT_NAME: string
): {
  base: Record<string, string>;
  dev: Record<string, string>;
  preprod: Record<string, string>;
  prod: Record<string, string>;
} => {
  const base = {
    CI_COMMIT_BEFORE_SHA: "0000000000000000000000000000000000000000",
    CI_COMMIT_DESCRIPTION: "",
    CI_COMMIT_MESSAGE: "chore(release): version 1.2.3",
    CI_COMMIT_REF_PROTECTED: "false",
    CI_COMMIT_SHA: "0123456789abcdefghijklmnopqrstuvwxyz0123",
    CI_COMMIT_SHORT_SHA: "0123456",
    CI_COMMIT_TIMESTAMP: "1111-11-11T11:11:11+00:00",
    CI_COMMIT_TITLE: "chore(release): version 1.2.3",
    CI_ENVIRONMENT_URL: `https://${CI_PROJECT_NAME}.fabrique.social.gouv.fr`,
    CI_PROJECT_DIR: `/builds/SocialGouv/${CI_PROJECT_NAME}`,
    CI_PROJECT_ID: "85",
    CI_PROJECT_NAME,
    CI_PROJECT_NAMESPACE: "SocialGouv",
    CI_PROJECT_PATH: `SocialGouv/${CI_PROJECT_NAME}`,
    CI_PROJECT_PATH_SLUG: `socialgouv-${CI_PROJECT_NAME}`,
    CI_PROJECT_ROOT_NAMESPACE: "SocialGouv",
    CI_PROJECT_TITLE: CI_PROJECT_NAME,
    CI_PROJECT_URL: `https://gitlab.factory.social.gouv.fr/SocialGouv/${CI_PROJECT_NAME}`,
    CI_PROJECT_VISIBILITY: "public",
    CI_REGISTRY_IMAGE: `registry.gitlab.factory.social.gouv.fr/socialgouv/${CI_PROJECT_NAME}`,
    // CI_REGISTRY_IMAGE: `registry.gitlab.factory.social.gouv.fr/socialgouv`,
    CI_REGISTRY_USER: "gitlab-ci-token",
    CI_REPOSITORY_URL: `https://gitlab-ci-token:[MASKED]@gitlab.factory.social.gouv.fr/SocialGouv/${CI_PROJECT_NAME}.git`,
    // HARBOR_PROJECT: "socialgouv/sample",
  };

  const dev = {
    ...base,
    CI_COMMIT_REF_NAME: "master",
    CI_COMMIT_REF_SLUG: "master",
    CI_COMMIT_TAG: "",
    CI_ENVIRONMENT_NAME: "master-dev2",
    CI_ENVIRONMENT_SLUG: "master-dev2",
    CI_ENVIRONMENT_URL: `https://master-dev2-${CI_PROJECT_NAME}.dev2.fabrique.social.gouv.fr`,
    KUBE_INGRESS_BASE_DOMAIN: "dev2.fabrique.social.gouv.fr",
    KUBE_NAMESPACE: `${CI_PROJECT_NAME}-85-master-dev2`,
    PRODUCTION: "",
  };

  const preprod = {
    ...base,
    CI_COMMIT_REF_NAME: "v1.2.3",
    CI_COMMIT_REF_SLUG: "v1-2-3",
    CI_COMMIT_TAG: "v1.2.3",
    CI_ENVIRONMENT_NAME: "preprod-dev2",
    CI_ENVIRONMENT_SLUG: "preprod-dev2",
    CI_ENVIRONMENT_URL: `https://preprod-${CI_PROJECT_NAME}.dev2.fabrique.social.gouv.fr`,
    KUBE_INGRESS_BASE_DOMAIN: "dev2.fabrique.social.gouv.fr",
    KUBE_NAMESPACE: `${CI_PROJECT_NAME}-85-preprod-dev2`,
    PRODUCTION: "",
  };

  const prod = {
    ...base,
    CI_COMMIT_REF_NAME: "v1.2.3",
    CI_COMMIT_REF_SLUG: "v1-2-3",
    CI_COMMIT_TAG: "v1.2.3",
    CI_ENVIRONMENT_NAME: "prod2",
    CI_ENVIRONMENT_SLUG: "prod2",
    CI_ENVIRONMENT_URL: `https://${CI_PROJECT_NAME}.fabrique.social.gouv.fr`,
    KUBE_INGRESS_BASE_DOMAIN: "fabrique.social.gouv.fr",
    KUBE_NAMESPACE: CI_PROJECT_NAME,
    PRODUCTION: "true",
  };

  return { base, dev, preprod, prod };
};
