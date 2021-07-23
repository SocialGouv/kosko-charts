import { createNodeCJSEnvironment } from "@kosko/env";

import { create } from "./index";

process.env.CI_COMMIT_SHA = "longsha";
process.env.CI_COMMIT_SHORT_SHA = "shortsha";
process.env.CI_ENVIRONMENT_SLUG = "some-slug";
process.env.CI_ENVIRONMENT_NAME = "some-name";
process.env.CI_PROJECT_PATH_SLUG = "some-path";
process.env.KUBE_INGRESS_BASE_DOMAIN = "dev2.fabrique.social.gouv.fr";
process.env.KUBE_NAMESPACE = "some-namespace";

beforeEach(() => {
  jest.resetModules();
});

test("should create strapi dev config", async () => {
  const env = createNodeCJSEnvironment({ cwd: "/tmp" });
  process.env.CI_REGISTRY_IMAGE = "/path/to/docker/image";
  process.env.CI_ENVIRONMENT_URL = "https://path/to/env";
  process.env.CI_PROJECT_NAME = "some-project";
  expect(
    await create("hello", {
      env,
    })
  ).toMatchSnapshot();
});

test("should create strapi prod config", async () => {
  const env = createNodeCJSEnvironment({ cwd: "/tmp" });
  env.env = "prod";
  process.env.PRODUCTION = "true";
  process.env.CI_COMMIT_TAG = "v42";
  process.env.CI_REGISTRY_IMAGE = "/path/to/docker/image";
  process.env.CI_ENVIRONMENT_URL = "https://path/to/env";
  process.env.CI_PROJECT_NAME = "some-project";
  expect(
    await create("hello", {
      env,
    })
  ).toMatchSnapshot();
});
