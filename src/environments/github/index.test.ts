import env from "./index";

test.each([
  ["because of missing variables", {}],
  [
    "because of empty strings",
    {
      GITHUB_JOB: " ",
      GITHUB_REPOSITORY: " ",
      GITHUB_RUN_ID: " ",
      GITHUB_SHA: " ",
      SOCIALGOUV_KUBE_INGRESS_BASE_DOMAIN: " ",
    },
  ],
])("should throw %s", (_: string, testEnv?: NodeJS.ProcessEnv) => {
  expect(() => env(testEnv)).toThrowErrorMatchingSnapshot();
});

const validEnv = {
  GITHUB_JOB: "5678",
  GITHUB_REPOSITORY: "socialgouv/sample",
  GITHUB_RUN_ID: "1234",
  GITHUB_SHA: "0123456789abcdefghijklmnopqrstuvwxyz0123",
  SOCIALGOUV_KUBE_INGRESS_BASE_DOMAIN: "dev2.fabrique.social.gouv.fr",
  SOCIALGOUV_PREPRODUCTION: "",
  SOCIALGOUV_PRODUCTION: "",
};
test.each([
  ["the gitlab global env", { ...validEnv }],
  [
    "tagged gitlab global env",
    {
      ...validEnv,
      GITHUB_REF: "vX.Y.Z",
    },
  ],
  [
    "production gitlab global env",
    {
      ...validEnv,
      GITHUB_REF: "vX.Y.Z",
      SOCIALGOUV_PRODUCTION: "true",
    },
  ],
])("should return %s", (_: string, testEnv?: NodeJS.ProcessEnv) => {
  expect(env(testEnv)).toMatchSnapshot();
});
