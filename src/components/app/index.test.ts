import { Environment } from "@kosko/env";
import { promises } from "fs";
import { directory } from "tempy";

import { create } from "./index";

const gitlabEnv = {
  CI_COMMIT_BEFORE_SHA: "0000000000000000000000000000000000000000",
  CI_COMMIT_DESCRIPTION: "",
  CI_COMMIT_REF_PROTECTED: "false",
  CI_COMMIT_SHA: "0123456789abcdefghijklmnopqrstuvwxyz0123",
  CI_COMMIT_SHORT_SHA: "0123456",
  CI_COMMIT_TIMESTAMP: "1111-11-11T11:11:11+00:00",
  CI_ENVIRONMENT_URL: "https://sample-next-app.fabrique.social.gouv.fr",
  CI_PROJECT_DIR: "/builds/SocialGouv/sample-next-app",
  CI_PROJECT_ID: "85",
  CI_PROJECT_NAME: "sample-next-app",
  CI_PROJECT_NAMESPACE: "SocialGouv",
  CI_PROJECT_PATH_SLUG: "socialgouv-sample-next-app",
  CI_PROJECT_PATH: "SocialGouv/sample-next-app",
  CI_PROJECT_ROOT_NAMESPACE: "SocialGouv",
  CI_PROJECT_TITLE: "sample-next-app",
  CI_PROJECT_URL:
    "https://gitlab.factory.social.gouv.fr/SocialGouv/sample-next-app",
  CI_PROJECT_VISIBILITY: "public",
  CI_REGISTRY_IMAGE:
    "registry.gitlab.factory.social.gouv.fr/socialgouv/sample-next-app",
  CI_REGISTRY_USER: "gitlab-ci-token",
  CI_REPOSITORY_URL:
    "https://gitlab-ci-token:[MASKED]@gitlab.factory.social.gouv.fr/SocialGouv/sample-next-app.git",

  CI_COMMIT_TAG: "",
  PRODUCTION: "",
};

jest.mock("@socialgouv/kosko-charts/environments/gitlab", () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __esModule: true,
  default: () => ({
    annotations: {
      "app.gitlab.com/app": "socialgouv-sample",
      "app.gitlab.com/env": "my-test",
    },
    domain: "fabrique.social.gouv.fr",
    subdomain: "sample",
    labels: {
      application: "sample",
      owner: "sample",
      team: "sample",
    },

    namespace: { name: "sample-42-my-test" },
  }),
}));

beforeEach(() => {
  jest.resetModules();
});

test("should throw because of a missing envs", () => {
  const env = new Environment("/tmp");
  expect(() => create("app", { env })).toThrowErrorMatchingSnapshot();
});

test("should return dev manifests", async () => {
  Object.assign(process.env, gitlabEnv);
  const cwd = directory();
  const env = new Environment(cwd);
  env.env = "dev";
  await promises.mkdir(`${cwd}/environments/dev`, { recursive: true });
  expect(create("app", { env })).toMatchSnapshot();
});

test("should return prod manifests", async () => {
  Object.assign(process.env, gitlabEnv);
  Object.assign(process.env, {
    PRODUCTION: true,
  });
  const cwd = directory();
  const env = new Environment(cwd);
  env.env = "prod";
  await promises.mkdir(`${cwd}/environments/prod`, { recursive: true });
  expect(create("app", { env })).toMatchSnapshot();
});

test("should return prod manifests with custom subdomain", async () => {
  Object.assign(process.env, gitlabEnv);
  Object.assign(process.env, {
    PRODUCTION: true,
  });
  const cwd = directory();
  const env = new Environment(cwd);
  env.env = "prod";
  await promises.mkdir(`${cwd}/environments/prod`, { recursive: true });
  expect(
    create("app", {
      env,
      config: {
        subdomain: "another",
      },
    })
  ).toMatchSnapshot();
});
