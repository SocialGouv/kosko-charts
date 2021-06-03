import env from "./index";

test.each([
  ["because of missing variables", undefined],
  [
    "because of empty strings",
    {
      GITHUB_JOB: " ",
      GITHUB_REF: " ",
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
  GITHUB_REPOSITORY: "socialgouv/sample-next-app",
  GITHUB_RUN_ID: "1234",
  GITHUB_SHA: "abcdef",
  SOCIALGOUV_KUBE_INGRESS_BASE_DOMAIN: "dev2.fabrique.social.gouv.fr",
};
test.each([
  ["the github global env", { ...validEnv }],
  [
    "tagged github global env",
    {
      ...validEnv,
      GITHUB_REF: "some-branch",
    },
  ],
  [
    "preproproduction github global env",
    {
      ...validEnv,
      GITHUB_REF: "v4.12.2",
      PREPRODUCTION: "true",
    },
  ],
  [
    "production github global env",
    {
      ...validEnv,
      GITHUB_REF: "v4.12.2",
      PRODUCTION: "true",
    },
  ],
])("should return %s", (_: string, testEnv?: NodeJS.ProcessEnv) => {
  expect(env(testEnv)).toMatchSnapshot();
});
