//
import { config } from "dotenv";
import { KOSKO_BIN, TIMEOUT } from "e2e/templates/helpers";
import execa from "execa";
import { resolve } from "path";

//

const cwd = resolve(__dirname, "..");

test(
  "kosko generate --env prod : should generate a kitchen sink prod manifest",
  async () => {
    const gitlabEnv = config({
      path: resolve(cwd, "./environments/.gitlab-ci.env"),
    }).parsed;
    // Required to allow seemless integration code example
    const result = await execa.node(
      KOSKO_BIN,
      ["generate", "--env", "prod", "yaml"],
      {
        cwd,
        env: { ...gitlabEnv },
      }
    );

    expect(result.stdout).toMatchSnapshot();
    expect(result.exitCode).toEqual(0);
  },
  TIMEOUT
);
