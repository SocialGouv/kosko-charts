//

import { config } from "dotenv";
import { template, TIMEOUT } from "e2e/templates/helpers";
import execa from "execa";
import { basename, resolve } from "path";

//

const cwd = template(basename(resolve(__dirname, "..", "..")));

test(
  "yarn --silent dropdb : should generate a dropdb manifest",
  async () => {
    const gitlabEnv = config({
      path: resolve(cwd, "./environments/.gitlab-ci.env"),
    }).parsed;
    // Required to allow seemless integration code example
    const result = await execa("yarn", ["--silent", "dropdb"], {
      cwd,
      env: { ...gitlabEnv },
    });

    expect(result.stdout).toMatchSnapshot();
    expect(result.exitCode).toEqual(0);
  },
  TIMEOUT
);
