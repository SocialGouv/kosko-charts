export const project = (
  projectName: string
): {
  base: Record<string, string>;
  dev: Record<string, string>;
  preprod: Record<string, string>;
  prod: Record<string, string>;
} => {
  const base = {
    GITHUB_JOB: "5678",
    GITHUB_REPOSITORY: `socialgouv/${projectName}`,
    GITHUB_RUN_ID: "1234",
    GITHUB_SHA: "0123456789abcdefghijklmnopqrstuvwxyz0123",
    // Additional
    SOCIALGOUV_KUBE_INGRESS_BASE_DOMAIN: "dev2.fabrique.social.gouv.fr",
    SOCIALGOUV_PREPRODUCTION: "",
    SOCIALGOUV_PRODUCTION: "",
  };

  const dev = {
    ...base,
  };

  const preprod = {
    ...base,
    GITHUB_REF: "v1.2.3",
    SOCIALGOUV_PREPRODUCTION: "true",
  };

  const prod = {
    ...base,
    GITHUB_REF: "v1.2.3",
    SOCIALGOUV_KUBE_INGRESS_BASE_DOMAIN: "fabrique.social.gouv.fr",
    SOCIALGOUV_PRODUCTION: "true",
  };

  return { base, dev, preprod, prod };
};
