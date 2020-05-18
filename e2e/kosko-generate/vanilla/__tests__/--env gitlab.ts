//

import { dirname, join } from "path";

// eslint-disable-next-line import/default
import execa from "execa";

import env from "../../.env";

//

test("--env gitlab : should generate gitlab manifest", async () => {
  const { stdout } = await execa("yarn", ["bin"]);
  const KOSKO_BIN = join(stdout, "kosko");
  // Required to allow seemless integration code example
  const extraArgs = ["-r", "module-alias/register"];
  const result = await execa(
    KOSKO_BIN,
    ["generate", "--env", "gitlab", ...extraArgs],
    {
      cwd: dirname(__dirname),
      env,
    }
  );
  expect(result.stdout).toMatchSnapshot();
  expect(result.exitCode).toEqual(0);
});
