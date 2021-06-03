//

import { Environment } from "@kosko/env";
import { promises } from "fs";
import { directory } from "tempy";

import { create } from "./index";

const githubEnv = {
  GITHUB_REPOSITORY: "some-org/sample",
  GITHUB_SHA: "abcdefg",
  SOCIALGOUV_KUBE_INGRESS_BASE_DOMAIN: "dev2.fabrique.social.gouv.fr",
};

jest.mock("@socialgouv/kosko-charts/environments/gitlab", () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __esModule: true,
  default: () => ({
    annotations: {
      // "app.gitlab.com/app": "socialgouv-sample",
      // "app.gitlab.com/env": "my-test",
    },
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
  expect(() => create({ env })).toThrowErrorMatchingSnapshot();
});

test("should return create an job", async () => {
  Object.assign(process.env, githubEnv);
  const cwd = directory();
  const env = new Environment(cwd);
  env.env = "dev";
  await promises.mkdir(`${cwd}/environments/dev`, { recursive: true });
  await promises.writeFile(
    `${cwd}/environments/dev/pg.sealed-secret.yaml`,
    "---\napiVersion: v1\nkind: ConfigMap"
  );
  expect(create({ env })).toMatchSnapshot();
});

test("should use custom pgHost", async () => {
  const env = new Environment("/tmp/xxx");
  env.env = "dev";
  await promises.mkdir(`/tmp/xxx/environments/dev`, { recursive: true });
  await promises.writeFile(
    `/tmp/xxx/environments/dev/pg.sealed-secret.yaml`,
    "---\napiVersion: v1\nkind: ConfigMap"
  );
  expect(
    create({ config: { pgHost: "pouetpouet.com" }, env })
  ).toMatchSnapshot();
});
