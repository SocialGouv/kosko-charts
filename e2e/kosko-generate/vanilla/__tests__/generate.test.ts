//

import { dirname, join } from "path";
// eslint-disable-next-line import/default
import execa from "execa";

//

test("--env local : should generate local manifest", async () => {
  const { stdout } = await execa("yarn", ["bin"]);
  const KOSKO_BIN = join(stdout, "kosko");
  // Required to allow seemless integration code example
  const extraArgs = ["-r", "module-alias/register"];
  const result = await execa(
    KOSKO_BIN,
    ["generate", "--env", "local", ...extraArgs],
    {
      cwd: dirname(__dirname),
      env: {
        USERNAME: "toto",
      },
    }
  );
  expect(result.stdout).toMatchSnapshot();
  expect(result.exitCode).toEqual(0);
});

test("--env gitlab : should generate gitlab manifest", async () => {
  const { stdout } = await execa("yarn", ["bin"]);
  const KOSKO_BIN = join(stdout, "kosko");
  // Required to allow seemless integration code example
  const extraArgs = ["-r", "module-alias/register"];
  const result = await execa(
    KOSKO_BIN,
    ["generate", "--env", "gitlab", ...extraArgs],
    {
      cwd: dirname(__dirname),
      env: {
        CI_ENVIRONMENT_NAME: "fabrique-dev",
        CI_ENVIRONMENT_SLUG: "my-test",
        CI_PROJECT_NAME: "sample",
        CI_PROJECT_PATH_SLUG: "socialgouv-sample",
        CI_REGISTRY_IMAGE:
          "registry.gitlab.factory.social.gouv.fr/socialgouv/sample",
        IMAGE_TAG: "x.y.z",
        KUBE_INGRESS_BASE_DOMAIN: "dev.fabrique.social.gouv.fr",
        KUBE_NAMESPACE: "sample-42-my-test",
        RANCHER_PROJECT_ID: "c-kk8xm:p-4fxg8",
      },
    }
  );
  expect(result.stdout).toMatchSnapshot();
  expect(result.exitCode).toEqual(0);
});
