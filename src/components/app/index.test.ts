import { createNodeCJSEnvironment } from "@kosko/env";

import { project } from "@socialgouv/kosko-charts/testing/fake/gitlab-ci.env";
import { promises } from "fs";
import { directory } from "tempy";

import { create } from "./index";

jest.mock("@socialgouv/kosko-charts/environments/gitlab", () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __esModule: true,
  default: () => ({
    annotations: {
      "app.gitlab.com/app": "socialgouv-sample",
      "app.gitlab.com/env": "my-test",
    },
    domain: "fabrique.social.gouv.fr",
    labels: {
      application: "sample",
      owner: "sample",
      team: "sample",
    },
    namespace: { name: "sample-42-my-test" },
    subdomain: "sample",
  }),
}));

beforeEach(() => {
  jest.resetModules();
});

test("should throw because of a missing envs", () => {
  const env = createNodeCJSEnvironment({ cwd: "/tmp" });
  expect(() => create("app", { env })).toThrowErrorMatchingSnapshot();
});

test("should return dev manifests", async () => {
  const gitlabEnv = project("sample").dev;
  Object.assign(process.env, gitlabEnv);
  const cwd = directory();
  const env = createNodeCJSEnvironment({ cwd });
  env.env = "dev";
  await promises.mkdir(`${cwd}/environments/dev`, { recursive: true });
  expect(create("app", { env })).toMatchSnapshot();
});

test("should return prod manifests", async () => {
  const gitlabEnv = project("sample").prod;
  Object.assign(process.env, gitlabEnv);
  const cwd = directory();
  const env = createNodeCJSEnvironment({ cwd });
  env.env = "prod";
  await promises.mkdir(`${cwd}/environments/prod`, { recursive: true });
  expect(create("app", { env })).toMatchSnapshot();
});

test("should return preprod manifests with NO custom subdomain", async () => {
  const gitlabEnv = project("sample").preprod;
  Object.assign(process.env, gitlabEnv);
  const cwd = directory();
  const env = createNodeCJSEnvironment({ cwd });
  env.env = "preprod";
  await promises.mkdir(`${cwd}/environments/preprod`, { recursive: true });
  expect(
    create("app", {
      config: {
        subdomain: "another",
      },
      env,
    })
  ).toMatchSnapshot();
});

test("should return prod manifests with custom subdomain", async () => {
  const gitlabEnv = project("sample").prod;
  Object.assign(process.env, gitlabEnv);
  const cwd = directory();
  const env = createNodeCJSEnvironment({ cwd });

  env.env = "prod";
  await promises.mkdir(`${cwd}/environments/prod`, { recursive: true });
  expect(
    create("app", {
      config: {
        subdomain: "another",
      },
      env,
    })
  ).toMatchSnapshot();
});

test("should return prod manifests without custom subdomain if undefined", async () => {
  const gitlabEnv = project("sample").prod;
  Object.assign(process.env, gitlabEnv);
  const cwd = directory();
  const env = createNodeCJSEnvironment({ cwd });

  env.env = "prod";
  await promises.mkdir(`${cwd}/environments/prod`, { recursive: true });
  expect(
    create("app", {
      config: {
        subdomain: undefined,
      },
      env,
    })
  ).toMatchSnapshot();
});
