//

// changes the cwd to a tmp folder
import "templates/nok8s/utils/mock-directory";

import { config } from "dotenv";
import { KOSKO_BIN, template, TIMEOUT } from "e2e/templates/helpers";
import execa from "execa";
import { copyFile, mkdir } from "fs-extra";
import { basename, join, resolve } from "path";

const cwd = template(basename(resolve(__dirname, "..", "..")));

test(
  "yaml: kosko generate --prod",
  async () => {
    const destFolder = join(process.cwd(), "environments/prod/yaml");
    const sourceFile = join(__dirname, "redirect.yml");

    await mkdir(destFolder, { recursive: true });
    await copyFile(sourceFile, `${destFolder}/redirect.yml`);

    const gitlabEnv = config({
      path: resolve(cwd, "./environments/.gitlab-ci.env"),
    }).parsed;

    const env = {
      ...gitlabEnv,
      SOCIALGOUV_CONFIG_PATH: __dirname + "/config.json",
    };

    // Required to allow seemless integration code example
    const result = await execa.node(KOSKO_BIN, ["generate", "--env", "prod"], {
      cwd: process.cwd(),
      env,
    });

    expect(result.stdout).toMatchSnapshot();
    expect(result.exitCode).toEqual(0);
  },
  TIMEOUT
);
