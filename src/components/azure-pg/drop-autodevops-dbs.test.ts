/* eslint-disable sort-keys-fix/sort-keys-fix */
import { Environment } from "@kosko/env";
import { promises } from "fs";
import { directory } from "tempy";

import { dropAutodevopsDbsJob } from "./drop-autodevops-dbs.job";

const gitlabEnv = {
  CI_COMMIT_SHORT_SHA: "abcdefg",
  CI_ENVIRONMENT_NAME: "fabrique-dev",
  CI_ENVIRONMENT_SLUG: "my-test",
  CI_PROJECT_NAME: "sample",
  CI_PROJECT_PATH_SLUG: "socialgouv-sample",
  CI_REGISTRY_IMAGE: "registry.gitlab.factory.social.gouv.fr/socialgouv/sample",
  KUBE_INGRESS_BASE_DOMAIN: "dev.fabrique.social.gouv.fr",
  KUBE_NAMESPACE: "sample-42-my-test",
};

test("should use some-secret for running drop-autodevops-dbs", () => {
  expect(
    dropAutodevopsDbsJob({ secretRefName: "some-secret" })
  ).toMatchSnapshot();
});

test("should use default secret for running drop-autodevops-dbs", () => {
  expect(dropAutodevopsDbsJob()).toMatchSnapshot();
});
