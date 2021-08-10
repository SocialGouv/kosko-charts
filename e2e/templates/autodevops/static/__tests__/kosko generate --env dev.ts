//

// import child_process from "child_process";
import { config } from "dotenv";
import { KOSKO_BIN, template, TIMEOUT } from "e2e/templates/helpers";
import execa from "execa";
import { basename, resolve } from "path";
// import { directory } from "tempy";
// import util from "util";

// const exec = util.promisify(child_process.exec);

//

const cwd = template(basename(resolve(__dirname, "..", "..")));

test(
  "static: kosko generate --dev",
  async () => {
    const gitlabEnv = config({
      path: resolve(cwd, "./environments/.gitlab-ci.env"),
    }).parsed;

    const env = {
      ...gitlabEnv,
      SOCIALGOUV_CONFIG_PATH: __dirname + "/config.json",
    };

    // Required to allow seemless integration code example
    const result = await execa.node(KOSKO_BIN, ["generate", "--env", "dev"], {
      cwd,
      env,
    });

    expect(result.stdout).toMatchSnapshot();
    expect(result.exitCode).toEqual(0);
  },
  TIMEOUT
);

test(
  "static github: kosko generate --dev",
  async () => {
    const gitlabEnv = config({
      path: resolve(cwd, "./environments/.github-actions.env"),
    }).parsed;

    const env = {
      ...gitlabEnv,
      SOCIALGOUV_CONFIG_PATH: __dirname + "/config.json",
    };

    // Required to allow seemless integration code example
    const result = await execa.node(KOSKO_BIN, ["generate", "--env", "dev"], {
      cwd,
      env,
    });

    expect(result.stdout).toMatchSnapshot();
    expect(result.exitCode).toEqual(0);
  },
  TIMEOUT
);

// test(
//   "static github 2: kosko generate --dev",
//   async () => {
//     const dir = directory();

//     const gitlabEnv = config({
//       path: resolve(cwd, "./environments/.github-actions.env"),
//     }).parsed;

//     const env = {
//       ...gitlabEnv,
//       SOCIALGOUV_CONFIG_PATH: __dirname + "/config.json",
//     };

//     Object.assign(process.env, env);

//     const sha = process.env.GITHUB_SHA || "07aba587dbf2cf883d47f1d5709b440b1a43506a";

//     const cmd = `
//       npx degit SocialGouv/kosko-charts/templates/nok8s#${sha} ${dir}/nok8s; \
//       yarn --cwd ${dir}/nok8s --silent; \
//       yarn --cwd ${dir}/nok8s --silent generate --env dev
//     `;

//     // Required to allow seemless integration code example
//     // const result = await execa.node(KOSKO_BIN, ["generate", "--env", "dev"], {
//     //   cwd,
//     //   env,
//     // });
//     const { stdout: manifest } = await exec(cmd, { env: process.env });
//     expect(manifest).toMatchSnapshot();

//     // expect(result.stdout).toMatchSnapshot();
//     // expect(result.exitCode).toEqual(0);
//   },
//   TIMEOUT
// );
