//

import { copy, symlink } from "fs-extra";
import { join } from "path";
import { directory } from "tempy";

import { template } from "../../../e2e/templates/helpers";

const cwd = process.cwd();
const templateDir = template("autodevops");

beforeEach(async () => {
  const dir = directory();
  process.chdir(dir);

  const tmp = process.cwd();

  await symlink(join(templateDir, "utils"), `${tmp}/utils`);
  await symlink(join(templateDir, "types"), `${tmp}/types`);
  await copy(join(templateDir, "components"), `${tmp}/components`);
  await symlink(join(templateDir, "kosko.toml"), `${tmp}/kosko.toml`);
  await symlink(
    join(templateDir, "../..", "node_modules"),
    `${tmp}/node_modules`
  );
  await symlink(join(templateDir, "tsconfig.json"), `${tmp}/tsconfig.json`);
});

afterEach(() => {
  process.chdir(cwd);
});
