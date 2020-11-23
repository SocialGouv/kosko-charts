//

import { config } from "dotenv";
import { KOSKO_BIN, template, TIMEOUT } from "e2e/templates/helpers";
// eslint-disable-next-line import/default
import execa from "execa";
import { basename, resolve } from "path";

//

const cwd = template(basename(resolve(__dirname, "..", "..")));

test(
  "--env preprod : should generate dev manifest",
  async () => {
    const gitlabEnv = config({
      path: resolve(cwd, "./environments/.gitlab.env"),
    }).parsed;
    // Required to allow seemless integration code example
    const result = await execa.node(
      KOSKO_BIN,
      ["generate", "--env", "preprod"],
      {
        cwd,
        env: {
          ...gitlabEnv,
          CI_COMMIT_TAG: "v1.2.3",
          CI_ENVIRONMENT_NAME: "preprod-dev2",
          CI_ENVIRONMENT_SLUG: "preprod-dev2",
          KUBE_NAMESPACE: "sample-next-app-24-preprod-dev2",
        },
      }
    );

    expect(result.stdout).toMatchSnapshot();
    expect(result.exitCode).toEqual(0);
  },
  TIMEOUT
);
