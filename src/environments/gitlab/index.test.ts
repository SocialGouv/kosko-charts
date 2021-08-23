import env from "./index";

const OLD_ENV = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = { ...OLD_ENV };
});

afterAll(() => {
  process.env = OLD_ENV;
});

test.each([
  ["because of missing variables", undefined],
  [
    "because of empty strings",
    {
      CI_COMMIT_SHORT_SHA: " ",
      CI_COMMIT_TAG: " ",
      CI_ENVIRONMENT_NAME: " ",
      CI_ENVIRONMENT_SLUG: " ",
      CI_PROJECT_NAME: " ",
      CI_PROJECT_PATH_SLUG: " ",
      KUBE_INGRESS_BASE_DOMAIN: " ",
      KUBE_NAMESPACE: " ",
      PRODUCTION: " ",
    },
  ],
])("should throw %s", (_: string, testEnv?: NodeJS.ProcessEnv) => {
  expect(() => env(testEnv)).toThrowErrorMatchingSnapshot();
});

const validEnv = {
  CI_COMMIT_SHA: "0123456789abcdefghijklmnopqrstuvwxyz0123",
  CI_COMMIT_SHORT_SHA: "0123456",
  CI_ENVIRONMENT_NAME: "fabrique-dev",
  CI_ENVIRONMENT_SLUG: "my-test",
  CI_PROJECT_NAME: "sample",
  CI_PROJECT_PATH_SLUG: "socialgouv-sample",
  CI_REGISTRY_IMAGE: "registry.gitlab.factory.social.gouv.fr/socialgouv/sample",
  KUBE_INGRESS_BASE_DOMAIN: "dev2.fabrique.social.gouv.fr",
  KUBE_NAMESPACE: "sample-42-my-test",
};

test.each([
  ["the gitlab global env", { ...validEnv }],
  [
    "the gitlab global env of the cluster dev2",
    { ...validEnv, CI_ENVIRONMENT_NAME: "fabrique-dev2" },
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
  for (const [key, value] of Object.entries(testEnv ?? {})) {
    process.env[key] = value;
  }
  expect(env(testEnv)).toMatchSnapshot();
});

test("default production namespace", () => {
  const testEnv = {
    ...validEnv,
    PRODUCTION: "true",
  };
  expect(env(testEnv).metadata.namespace.name).toEqual("sample");
});

test("PRODUCTION_NAMESPACE production namespace", () => {
  const testEnv = {
    ...validEnv,
    PRODUCTION: "true",
    PRODUCTION_NAMESPACE: "test-2",
  };
  expect(env(testEnv).metadata.namespace.name).toEqual("test-2");
});
