//

import { config } from "dotenv";
import { KOSKO_BIN, template, TIMEOUT } from "e2e/templates/helpers";
import execa from "execa";
import { basename, resolve } from "path";

//

const cwd = template(basename(resolve(__dirname, "..", "..")));

test(
  "app: kosko generate --prod",
  async () => {
    const gitlabEnv = config({
      path: resolve(cwd, "./environments/.gitlab-ci.env"),
    }).parsed;

    const env = {
      ...gitlabEnv,
      SOCIALGOUV_CONFIG_PATH: __dirname + "/config.json",
    };

    // Required to allow seemless integration code example
    const result = await execa.node(KOSKO_BIN, ["generate", "--env", "prod"], {
      cwd,
      env,
    });

    expect(result.stdout).toMatchSnapshot();
    expect(result.exitCode).toEqual(0);
  },
  TIMEOUT
);

// //

// import { getEnvManifests } from "@socialgouv/kosko-charts/testing";
// import { project } from "@socialgouv/kosko-charts/testing/fake/gitlab-ci.env";

// const name = "myapp";

// jest.setTimeout(1000 * 60);

// test("app: kosko generate --prod", async () => {
//   expect(
//     await getEnvManifests("prod", "'!(_*)'", {
//       ...project(name).prod,
//       SOCIALGOUV_CONFIG_PATH: __dirname + "/config.json",
//     })
//   ).toMatchSnapshot();
// });
