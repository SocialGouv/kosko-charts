import { Environment } from "@kosko/env";
import { promises } from "fs";
import { directory } from "tempy";

import { create } from "./index";

const gitlabEnv = {
  CI_ENVIRONMENT_NAME: "fabrique-dev",
  CI_ENVIRONMENT_SLUG: "my-test",
  CI_PROJECT_NAME: "sample",
  CI_PROJECT_PATH_SLUG: "socialgouv-sample",
  CI_REGISTRY_IMAGE: "registry.gitlab.factory.social.gouv.fr/socialgouv/sample",
  KUBE_INGRESS_BASE_DOMAIN: "dev.fabrique.social.gouv.fr",
  KUBE_NAMESPACE: "sample-42-my-test",
};

test("should throw because of a missing CI_PROJECT_NAME", () => {
  const env = new Environment("/tmp");
  env.env = "prod";
  expect(() => create({ env })).toThrowError(
    "Missing process.env.CI_PROJECT_NAME"
  );
});

test("should throw because of a missing envs", () => {
  process.env.CI_PROJECT_NAME = "sample-next-app";
  const env = new Environment("/tmp");
  env.env = "dev";
  expect(() => create({ env })).toThrowErrorMatchingSnapshot();
});

test("should throw because of a missing pg.sealed-secret.yaml", () => {
  Object.assign(process.env, gitlabEnv);
  const env = new Environment("/tmp");
  env.env = "prod";
  expect(() => create({ env })).toThrowError("Missing pg.sealed-secret.yaml");
});

test("should return create an job", async () => {
  Object.assign(process.env, gitlabEnv);
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
