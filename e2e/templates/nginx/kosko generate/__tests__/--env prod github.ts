//

import { config } from "dotenv";
import { KOSKO_BIN, template, TIMEOUT } from "e2e/templates/helpers";
import execa from "execa";
import { basename, resolve } from "path";

//

const cwd = template(basename(resolve(__dirname, "..", "..")));

test(
  "--env prod : should generate prod manifest",
  async () => {
    const githubEnv = config({
      path: resolve(cwd, "./environments/.github-actions.env"),
    }).parsed;
    // Required to allow seemless integration code example
    const result = await execa.node(
      KOSKO_BIN,
      ["generate", "--env", "prod", "!(_*)"],
      {
        cwd,
        env: {
          ...githubEnv,
          SOCIALGOUV_PRODUCTION: "true",
        },
      }
    );

    expect(result.stdout).toMatchSnapshot();
    expect(result.exitCode).toEqual(0);
  },
  TIMEOUT
);
