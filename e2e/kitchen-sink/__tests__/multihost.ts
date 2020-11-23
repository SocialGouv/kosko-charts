//
import { config } from "dotenv";
import { KOSKO_BIN, TIMEOUT } from "e2e/templates/helpers";
// eslint-disable-next-line import/default
import execa from "execa";
import { resolve } from "path";

//

const cwd = resolve(__dirname, "..");

test(
  "kosko generate --env dev : should generate a kitchen sink dev manifest",
  async () => {
    const gitlabEnv = config({
      path: resolve(cwd, "./environments/.gitlab.env"),
    }).parsed;
    // Required to allow seemless integration code example
    const result = await execa.node(KOSKO_BIN, ["generate", "--env", "dev"], {
      cwd,
      env: { ...gitlabEnv },
    });

    expect(result.stdout).toMatchSnapshot();
    expect(result.exitCode).toEqual(0);
  },
  TIMEOUT
);
