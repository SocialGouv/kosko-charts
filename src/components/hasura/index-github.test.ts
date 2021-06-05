import { Environment } from "@kosko/env";

import { create } from "./index";

jest.mock("@socialgouv/kosko-charts/components/app", () => ({
  create: jest.fn().mockImplementation((...args: unknown[]) => args),
}));

beforeEach(() => {
  jest.resetModules();
});

test("should create hasura dev config", () => {
  const env = new Environment("/tmp");
  // process.env.CI_REGISTRY_IMAGE = "CI_REGISTRY_IMAGE";
  // process.env.CI_ENVIRONMENT_URL = "CI_ENVIRONMENT_URL";
  // process.env.CI_PROJECT_NAME = "CI_PROJECT_NAME";
  const manifest = create({
    env,
  });
  expect(manifest).toMatchSnapshot();
});
