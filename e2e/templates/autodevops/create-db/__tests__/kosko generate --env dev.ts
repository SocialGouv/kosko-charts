//

import { config } from "dotenv";
import { KOSKO_BIN, template, TIMEOUT } from "e2e/templates/helpers";
import execa from "execa";
import { basename, resolve } from "path";

//

const cwd = template(basename(resolve(__dirname, "..", "..")));

test(
  "create DB from gitlab : kosko generate jobs/create-db --env dev",
  async () => {
    const gitlabEnv = config({
      path: resolve(cwd, "./environments/.gitlab-ci.env"),
    }).parsed;

    const env = {
      ...gitlabEnv,
    };

    // Required to allow seemless integration code example
    const result = await execa.node(
      KOSKO_BIN,
      ["generate", "jobs/create-db", "--env", "dev"],
      {
        cwd,
        env,
      }
    );

    expect(result.stdout).toMatchSnapshot();
    expect(result.exitCode).toEqual(0);
  },
  TIMEOUT
);

test(
  "create DB from github : kosko generate jobs/create-db --env dev",
  async () => {
    const gitlabEnv = config({
      path: resolve(cwd, "./environments/.github-actions.env"),
    }).parsed;

    const env = {
      ...gitlabEnv,
      SOCIALGOUV_CONFIG_PATH: __dirname + "/config.json",
    };

    // Required to allow seemless integration code example
    const result = await execa.node(
      KOSKO_BIN,
      ["generate", "jobs/create-db", "--env", "dev"],
      {
        cwd,
        env,
      }
    );

    expect(result.stdout).toMatchSnapshot();
    expect(result.exitCode).toEqual(0);
  },
  TIMEOUT
);
