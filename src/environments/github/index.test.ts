import env from "./index";

test.each([
  // ["because of missing variables", undefined],
  [
    "because of empty strings",
    {
      GITHUB_JOB: " ",
      GITHUB_REF: " ",
      GITHUB_REPOSITORY: " ",
      GITHUB_RUN_ID: " ",
      GITHUB_SHA: " ",
      KUBE_NAMESPACE: " ",
      RANCHER_PROJECT_ID: " ",
      SOCIALGOUV_BASE_DOMAIN: " ",
    },
  ],
])("should throw %s", (_: string, testEnv?: NodeJS.ProcessEnv) => {
  expect(() => env(testEnv)).toThrowErrorMatchingSnapshot();
});

const validEnv = {
  GITHUB_JOB: "xxxxxxx-job",
  GITHUB_REF: "refs/heads/e2e-branch",
  GITHUB_REPOSITORY: "socialgouv/sample-next-app",
  GITHUB_RUN_ID: "12345",
  GITHUB_SHA: "8843083edb7f873cad1d1420731a60773594ffae",
  KUBE_NAMESPACE: "sample-next-app-24-e2e-branch-42",
  RANCHER_PROJECT_ID: "c-bd7z2:p-7ms8p",
  SOCIALGOUV_BASE_DOMAIN: "dev2.fabrique.social.gouv.fr",
};
test.each([
  ["the gitlab global env", { ...validEnv }],
  [
    "the gitlab global env of the cluster dev2",
    { ...validEnv, CI_ENVIRONMENT_NAME: "fabrique-dev2" },
  ],
  [
    "the gitlab global env with slugify",
    { ...validEnv, GITHUB_REF: "refs/heads/domifa-commander-8.x" },
  ],
  [
    "tagged gitlab global env",
    {
      ...validEnv,
      CI_COMMIT_TAG: "vX.Y.Z",
    },
  ],
  [
    "production gitlab global env",
    {
      ...validEnv,
      CI_COMMIT_TAG: "vX.Y.Z",
      CI_ENVIRONMENT_NAME: "fabrique-prod",
      PRODUCTION: "true",
    },
  ],
])("should return %s", (_: string, testEnv?: NodeJS.ProcessEnv) => {
  expect(env(testEnv)).toMatchSnapshot();
});