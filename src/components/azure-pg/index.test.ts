//

import {} from "@jest/globals";
import { createNodeCJSEnvironment } from "@kosko/env";
import environmentMock from "@socialgouv/kosko-charts/environments/index.mock";
import { promises } from "fs";
import { directory } from "tempy";

beforeEach(() => {
  jest.resetModules();
});

test("should return create an job", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);
  const cwd = directory();
  const env = createNodeCJSEnvironment({ cwd });
  env.env = "dev";
  await promises.mkdir(`${cwd}/environments/dev`, { recursive: true });
  await promises.writeFile(
    `${cwd}/environments/dev/pg.sealed-secret.yaml`,
    "---\napiVersion: v1\nkind: ConfigMap"
  );
  const { create } = await import("./index");
  expect(await create("foo", { env })).toMatchSnapshot();
});

test("should use custom pgHost", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);
  const env = createNodeCJSEnvironment({ cwd: "/tmp/xxx" });
  env.env = "dev";
  await promises.mkdir(`/tmp/xxx/environments/dev`, { recursive: true });
  await promises.writeFile(
    `/tmp/xxx/environments/dev/pg.sealed-secret.yaml`,
    "---\napiVersion: v1\nkind: ConfigMap"
  );
  const { create } = await import("./index");
  expect(
    await create("foo", { config: { pgHost: "pouetpouet.com" }, env })
  ).toMatchSnapshot();
});
