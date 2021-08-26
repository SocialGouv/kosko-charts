import { createNodeCJSEnvironment } from "@kosko/env";
import environmentMock from "@socialgouv/kosko-charts/environments/index.mock";
import { promises } from "fs";
import { directory } from "tempy";

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
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);
  const cwd = directory();
  const env = createNodeCJSEnvironment({ cwd });
  env.env = "dev";
  await promises.mkdir(`${cwd}/environments/dev`, { recursive: true });
  const { create } = await import("./index");
  expect(await create("app", { env })).toMatchSnapshot();
});

test("should return dev manifests with postgres", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);
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
  jest.doMock("@socialgouv/kosko-charts/environments", () => () => ({
    ...environmentMock(),
    isPreProduction: true,
    tag: "v1.2.3",
  }));
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
  jest.doMock("@socialgouv/kosko-charts/environments", () => () => ({
    ...environmentMock(),
    isPreProduction: true,
    tag: "v1.2.3",
  }));
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
  jest.doMock("@socialgouv/kosko-charts/environments", () => () => ({
    ...environmentMock(),
    isProduction: true,
    tag: "v1.2.3",
  }));
  const cwd = directory();
  const env = createNodeCJSEnvironment({ cwd });
  env.env = "prod";
  await promises.mkdir(`${cwd}/environments/prod`, { recursive: true });
  const { create } = await import("./index");
  expect(await create("app", { env })).toMatchSnapshot();
});

test("should return prod manifests with custom subdomain", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => () => ({
    ...environmentMock(),
    isProduction: true,
    tag: "v1.2.3",
  }));

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
  jest.doMock("@socialgouv/kosko-charts/environments", () => () => ({
    ...environmentMock(),
    isProduction: true,
    tag: "v1.2.3",
  }));
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
