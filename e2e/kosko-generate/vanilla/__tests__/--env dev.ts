//

// eslint-disable-next-line import/default
import execa from "execa";
import { dirname, resolve } from "path";

import env from "../../.env";

//

test("--env dev : should generate dev manifest", async () => {
  const { stdout: BIN_ROOT } = await execa("npm", ["bin"]);
  const KOSKO_BIN = resolve(BIN_ROOT, "kosko");
  // Required to allow seemless integration code example
  const extraArgs = ["-r", "module-alias/register"];
  const result = await execa.node(
    KOSKO_BIN,
    ["generate", "--env", "dev", ...extraArgs],
    {
      cwd: dirname(__dirname),
      env: { ...env },
    }
  );
  expect(result.stdout).toMatchSnapshot();
  expect(result.exitCode).toEqual(0);
});
