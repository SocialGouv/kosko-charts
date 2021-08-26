import { createNodeCJSEnvironment } from "@kosko/env";
import environmentMock from "@socialgouv/kosko-charts/environments/index.mock";

jest.mock("@socialgouv/kosko-charts/components/app", () => ({
  create: jest.fn().mockImplementation((...args: unknown[]) => args),
}));

beforeEach(() => {
  jest.resetModules();
});

test("should create hasura dev config", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);
  const env = createNodeCJSEnvironment({ cwd: "/tmp" });
  const { create } = await import("./index");
  const manifest = await create("hasura", {
    env,
  });
  expect(manifest).toMatchSnapshot();
});

test("should create hasura prod config", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => () => ({
    ...environmentMock(),
    isProduction: true,
    tag: "v1.2.3",
  }));
  const { create } = await import("./index");
  const env = createNodeCJSEnvironment({ cwd: "/tmp" });
  const manifest = await create("hasura", {
    env,
  });
  expect(manifest).toMatchSnapshot();
});
