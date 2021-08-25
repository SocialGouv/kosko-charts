import { createNodeCJSEnvironment } from "@kosko/env";
import type { CIEnv } from "@socialgouv/kosko-charts/types";
import { promises } from "fs";
import { directory } from "tempy";

const gitlabMock: CIEnv = {
  branch: "my-test-branch",
  branchSlug: "my-test-branch",
  environment: "my-test",
  isPreProduction: false,
  isProduction: false,
  metadata: {
    annotations: {
      "app.gitlab.com/app": "socialgouv-sample",
      "app.gitlab.com/env": "my-test",
    },
    domain: "fabrique.social.gouv.fr",
    git: {
      branch: "my-test-branch",
      remote: "git@github.com:SocialGouv/sample-next-app.git",
    },
    labels: {
      application: "sample",
      owner: "sample",
      team: "sample",
    },
    namespace: { name: "sample-42-my-test" },
    subdomain: "sample",
  },
  projectName: "sample",
  registry: "registry.gitlab.factory.social.gouv.fr/socialgouv/sample",
  sha: "0123456789abcdefghijklmnopqrstuvwxyz0123",
  shortSha: "0123456",
};

const ciEnvModuleMock = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __esModule: true,
  default: () => gitlabMock,
};

beforeEach(() => {
  jest.resetModules();
});

test("should throw because of a missing envs", async () => {
  const env = createNodeCJSEnvironment({ cwd: "/tmp" });
  const { create } = await import("./index");
  await expect(async () =>
    create("app", { env })
  ).rejects.toThrowErrorMatchingSnapshot();
});

test("should return dev manifests", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => ciEnvModuleMock);
  const cwd = directory();
  const env = createNodeCJSEnvironment({ cwd });
  env.env = "dev";
  await promises.mkdir(`${cwd}/environments/dev`, { recursive: true });
  const { create } = await import("./index");
  expect(await create("app", { env })).toMatchSnapshot();
});

test("should return dev manifests with postgres", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => ciEnvModuleMock);
  const cwd = directory();
  const env = createNodeCJSEnvironment({ cwd });
  env.env = "dev";
  await promises.mkdir(`${cwd}/environments/dev`, { recursive: true });
  const { create } = await import("./index");
  expect(
    await create("app", { config: { withPostgres: true }, env })
  ).toMatchSnapshot();
});

test("should return preprod manifests with NO custom subdomain", async () => {
  gitlabMock.isPreProduction = true;
  gitlabMock.tag = "v1.2.3";
  jest.doMock("@socialgouv/kosko-charts/environments", () => ciEnvModuleMock);
  const cwd = directory();
  const env = createNodeCJSEnvironment({ cwd });
  env.env = "preprod";
  await promises.mkdir(`${cwd}/environments/preprod`, { recursive: true });
  const { create } = await import("./index");
  expect(
    await create("app", {
      config: {
        subdomain: "another",
      },
      env,
    })
  ).toMatchSnapshot();
});

test("should return preprod manifests with postgres", async () => {
  gitlabMock.isPreProduction = true;
  gitlabMock.tag = "v1.2.3";
  jest.doMock("@socialgouv/kosko-charts/environments", () => ciEnvModuleMock);
  const cwd = directory();
  const env = createNodeCJSEnvironment({ cwd });
  env.env = "preprod";
  await promises.mkdir(`${cwd}/environments/preprod`, { recursive: true });
  const { create } = await import("./index");
  expect(
    await create("app", { config: { withPostgres: true }, env })
  ).toMatchSnapshot();
});

test("should return prod manifests", async () => {
  gitlabMock.isProduction = true;
  gitlabMock.tag = "v1.2.3";
  jest.doMock("@socialgouv/kosko-charts/environments", () => ciEnvModuleMock);
  const cwd = directory();
  const env = createNodeCJSEnvironment({ cwd });
  env.env = "prod";
  await promises.mkdir(`${cwd}/environments/prod`, { recursive: true });
  const { create } = await import("./index");
  expect(await create("app", { env })).toMatchSnapshot();
});

test("should return prod manifests with custom subdomain", async () => {
  gitlabMock.isProduction = true;
  gitlabMock.tag = "v1.2.3";
  jest.doMock("@socialgouv/kosko-charts/environments", () => ciEnvModuleMock);
  const cwd = directory();
  const env = createNodeCJSEnvironment({ cwd });
  env.env = "prod";
  await promises.mkdir(`${cwd}/environments/prod`, { recursive: true });
  const { create } = await import("./index");
  expect(
    await create("app", {
      config: {
        subdomain: "another",
      },
      env,
    })
  ).toMatchSnapshot();
});

test("should return prod manifests without custom subdomain if undefined", async () => {
  gitlabMock.isProduction = true;
  gitlabMock.tag = "v1.2.3";
  jest.doMock("@socialgouv/kosko-charts/environments", () => ciEnvModuleMock);
  const cwd = directory();
  const env = createNodeCJSEnvironment({ cwd });
  env.env = "prod";
  await promises.mkdir(`${cwd}/environments/prod`, { recursive: true });
  const { create } = await import("./index");
  expect(
    await create("app", {
      config: {
        subdomain: undefined,
      },
      env,
    })
  ).toMatchSnapshot();
});
