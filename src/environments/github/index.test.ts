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
  ["the github global env", { ...validEnv }],
  [
    "the github global env with slugify",
    { ...validEnv, GITHUB_REF: "refs/heads/domifa-commander-8.x" },
  ],
  [
    "the github global env with renovate prefixed env name",
    { ...validEnv, GITHUB_REF: "refs/heads/renovate/major-@jest-monorepo" },
  ],
  [
    "preproduction tagged github global env",
    {
      ...validEnv,
      GITHUB_REF: "refs/tags/vX.Y.Z",
      SOCIALGOUV_PREPRODUCTION: "true",
    },
  ],
  [
    "production github global env",
    {
      ...validEnv,
      GITHUB_REF: "refs/tags/vX.Y.Z",
      SOCIALGOUV_PRODUCTION: "true",
    },
  ],
])("should return %s", (_: string, testEnv?: NodeJS.ProcessEnv) => {
  expect(env(testEnv)).toMatchSnapshot();
});

test("default production namespace", () => {
  const testEnv = {
    ...validEnv,
    SOCIALGOUV_PRODUCTION: "true",
  };
  expect(env(testEnv).metadata.namespace.name).toEqual("sample-next-app");
});

test("SOCIALGOUV_PRODUCTION_NAMESPACE production namespace", () => {
  const testEnv = {
    ...validEnv,
    SOCIALGOUV_PRODUCTION: "true",
    SOCIALGOUV_PRODUCTION_NAMESPACE: "test-1",
  };
  expect(env(testEnv).metadata.namespace.name).toEqual("test-1");
});
