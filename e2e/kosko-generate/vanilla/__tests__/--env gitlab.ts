//

// eslint-disable-next-line import/default
import execa from "execa";
import { dirname, join } from "path";

import env from "../../.env";

//

test("--env gitlab : should generate dev manifest", async () => {
  const { stdout } = await execa("yarn", ["bin"]);
  const KOSKO_BIN = join(stdout, "kosko");
  // Required to allow seemless integration code example
  const extraArgs = ["-r", "module-alias/register"];
  const result = await execa(
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

test("--env gitlab : should generate preprod manifest", async () => {
  const { stdout } = await execa("yarn", ["bin"]);
  const KOSKO_BIN = join(stdout, "kosko");
  // Required to allow seemless integration code example
  const extraArgs = ["-r", "module-alias/register"];
  const result = await execa(
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

test("--env gitlab : should generate prod manifest", async () => {
  const { stdout } = await execa("yarn", ["bin"]);
  const KOSKO_BIN = join(stdout, "kosko");
  // Required to allow seemless integration code example
  const extraArgs = ["-r", "module-alias/register"];
  const result = await execa(
    KOSKO_BIN,
    ["generate", "--env", "prod", "!(_*)", ...extraArgs],
    {
      cwd: dirname(__dirname),
      env: { ...env, CI_COMMIT_TAG: "v1.2.3", PRODUCTION: "true" },
    }
  );
  expect(result.stdout).toMatchSnapshot();
  expect(result.exitCode).toEqual(0);
});
