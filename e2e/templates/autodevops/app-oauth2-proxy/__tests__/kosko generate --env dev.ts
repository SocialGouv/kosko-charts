// changes the cwd to a tmp folder
import "templates/autodevops/utils/mock-directory"; //

import { config } from "dotenv";
import { KOSKO_BIN, template, TIMEOUT } from "e2e/templates/helpers";
import execa from "execa";
import { copy } from "fs-extra";
import { join, resolve } from "path";

//

const cwd = template("autodevops");

test(
  "app: kosko generate --dev",
  async () => {
    const gitlabEnv = config({
      path: resolve(cwd, "./environments/.gitlab-ci.env"),
    }).parsed;

    const env = {
      ...gitlabEnv,
      SOCIALGOUV_CONFIG_PATH: __dirname + "/config.json",
    };

    const destFolder = join(process.cwd(), "environments");
    const sourceFolder = join(__dirname, "environments");

    console.log(destFolder);
    console.log(process.cwd());

    await copy(sourceFolder, destFolder);

    // Required to allow seemless integration code example
    const result = await execa.node(KOSKO_BIN, ["generate", "--env", "dev"], {
      cwd: process.cwd(),
      env,
    });

    expect(result.stdout).toMatchSnapshot();
    expect(result.exitCode).toEqual(0);
  },
  TIMEOUT
);
