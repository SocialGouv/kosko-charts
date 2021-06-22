//

import { copy, symlink } from "fs-extra";
import { join } from "path";
import { directory } from "tempy";

import { template } from "../../../e2e/templates/helpers";

const cwd = process.cwd();
const templateDir = template("nok8s");

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

// //

// import path from "path";
// import fsx from "fs-extra";
// import { directory } from "tempy";

// const cwd = process.cwd();

// beforeEach(async () => {
//   process.chdir(directory());

//   const tmp = process.cwd();

//   await fsx.symlink(path.join(__dirname, "..", "utils"), `${tmp}/utils`);
//   await fsx.copy(path.join(__dirname, "..", "components"), `${tmp}/components`);
//   await fsx.symlink(
//     path.join(__dirname, "..", "kosko.toml"),
//     `${tmp}/kosko.toml`
//   );
//   await fsx.symlink(
//     path.join(__dirname, "..", "node_modules"),
//     `${tmp}/node_modules`
//   );
//   await fsx.symlink(
//     path.join(__dirname, "..", "tsconfig.json"),
//     `${tmp}/tsconfig.json`
//   );
// });

// afterEach(() => {
//   process.chdir(cwd);
// });
