//

import { beforeEach, jest, test } from "@jest/globals";
import { createNodeCJSEnvironment } from "@kosko/env";
import environmentMock from "@socialgouv/kosko-charts/environments/index.mock";
import { promises } from "fs";
import { directory } from "tempy";

beforeEach(() => {
  jest.resetModules();
});
test("should return the autodevops job and secret pair", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);
  const cwd = directory();
  const env = createNodeCJSEnvironment({ cwd });
  env.env = "dev";
  await promises.mkdir(`${cwd}/environments/dev`, { recursive: true });
  const { create } = await import("./autodevops");
  expect(await create("foo", { env })).toMatchSnapshot();
});

// HACK(douglasdutiel): disabled test
// This test is crashing jest on my machine...
// ```
// RUNS  src/components/azure-pg/autodevops.test.ts
// error Command failed with signal "SIGSEGV".
// ```
// The reason is unknow...
//
// eslint-disable-next-line jest/no-disabled-tests
test.skip("should return a SealedSecret if the name match a file", async () => {
  const name = "foo";
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);
  const cwd = directory();
  const env = createNodeCJSEnvironment({ cwd });
  env.env = "dev";
  await promises.mkdir(`${cwd}/environments/dev`, { recursive: true });
  await promises.writeFile(
    `${cwd}/environments/dev/${name}.sealed-secret.yaml`,
    "---\napiVersion: v1\nkind: SealedSecret"
  );
  const { create } = await import("./autodevops");
  await expect(create(name, { env })).resolves.toMatchSnapshot();
});
