//

import { createNodeCJSEnvironment } from "@kosko/env";
import { promises } from "fs";
import { directory } from "tempy";

const gitlabEnv = {
  CI_COMMIT_SHORT_SHA: "abcdefg",
  CI_ENVIRONMENT_NAME: "fabrique-dev",
  CI_ENVIRONMENT_SLUG: "my-test",
  CI_PROJECT_NAME: "sample",
  CI_PROJECT_PATH_SLUG: "socialgouv-sample",
  CI_REGISTRY_IMAGE: "registry.gitlab.factory.social.gouv.fr/socialgouv/sample",
  KUBE_INGRESS_BASE_DOMAIN: "dev2.fabrique.social.gouv.fr",
  KUBE_NAMESPACE: "sample-42-my-test",
};

const gitlabMock = {
  manifest: {
    annotations: {
      "app.gitlab.com/app": "socialgouv-sample",
      "app.gitlab.com/env": "my-test",
    },
    labels: {
      application: "sample",
      owner: "sample",
      team: "sample",
    },
    namespace: { name: "sample-42-my-test" },
  },
  projectName: "sample",
  shortSha: "abcdefg",
};

const gitlabModuleMock = {
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
  expect(() => create({ env })).toThrowErrorMatchingSnapshot();
});

test("should return create an job", async () => {
  jest.doMock(
    "@socialgouv/kosko-charts/environments/gitlab",
    () => gitlabModuleMock
  );
  Object.assign(process.env, gitlabEnv);
  const cwd = directory();
  const env = createNodeCJSEnvironment({ cwd });
  env.env = "dev";
  await promises.mkdir(`${cwd}/environments/dev`, { recursive: true });
  await promises.writeFile(
    `${cwd}/environments/dev/pg.sealed-secret.yaml`,
    "---\napiVersion: v1\nkind: ConfigMap"
  );
  const { create } = await import("./index");
  expect(create({ env })).toMatchSnapshot();
});

test("should use custom pgHost", async () => {
  jest.doMock(
    "@socialgouv/kosko-charts/environments/gitlab",
    () => gitlabModuleMock
  );
  process.env.CI_PROJECT_NAME = "sample-next-app";
  const env = createNodeCJSEnvironment({ cwd: "/tmp/xxx" });
  env.env = "dev";
  await promises.mkdir(`/tmp/xxx/environments/dev`, { recursive: true });
  await promises.writeFile(
    `/tmp/xxx/environments/dev/pg.sealed-secret.yaml`,
    "---\napiVersion: v1\nkind: ConfigMap"
  );
  const { create } = await import("./index");
  expect(
    create({ config: { pgHost: "pouetpouet.com" }, env })
  ).toMatchSnapshot();
});
