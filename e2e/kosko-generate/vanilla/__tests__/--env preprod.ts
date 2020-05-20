//

// eslint-disable-next-line import/default
import execa from "execa";
import { dirname, resolve } from "path";

import env from "../../.env";

//

test("--env preprod : should generate preprod manifest", async () => {
  const { stdout: BIN_ROOT } = await execa("npm", ["bin"]);
  const KOSKO_BIN = resolve(BIN_ROOT, "kosko");
  // Required to allow seemless integration code example
  const extraArgs = ["-r", "module-alias/register"];
  const result = await execa.node(
    KOSKO_BIN,
    ["generate", "--env", "dev", ...extraArgs],
    {
      cwd: dirname(__dirname),
      env: { ...env, CI_COMMIT_TAG: "v1.2.3" },
    }
  );
  expect(result.stdout).toMatchSnapshot();
  expect(result.exitCode).toEqual(0);
});
