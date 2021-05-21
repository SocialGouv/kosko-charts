import { createNodeCJSEnvironment } from "@kosko/env";

import { create } from "./index";

jest.mock("@socialgouv/kosko-charts/components/app", () => ({
  create: jest.fn().mockImplementation((...args: unknown[]) => args),
}));

beforeEach(() => {
  jest.resetModules();
});

test("should create hasura dev config", () => {
  const env = createNodeCJSEnvironment({ cwd: "/tmp" });
  process.env.CI_REGISTRY_IMAGE = "/path/to/docker/image";
  process.env.CI_ENVIRONMENT_URL = "https://path/to/env";
  process.env.CI_PROJECT_NAME = "some-project";
  const manifest = create({
    env,
  });
  expect(manifest).toMatchSnapshot();
});
