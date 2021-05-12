//
import { config } from "dotenv";
import { KOSKO_BIN, TIMEOUT } from "e2e/templates/helpers";
import execa from "execa";
import { resolve } from "path";

//

const cwd = resolve(__dirname, "..");

test(
  "kosko generate --env dev : should generate a kitchen sink dev manifest",
  async () => {
    const githubEnv = config({
      path: resolve(cwd, "./environments/.github-actions.env"),
    }).parsed;

    // Required to allow seemless integration code example
    const result = await execa.node(KOSKO_BIN, ["generate", "--env", "dev"], {
      cwd,
      env: { ...githubEnv },
    });

    expect(result.stdout).toMatchSnapshot();
    expect(result.exitCode).toEqual(0);
  },
  TIMEOUT
);

test(
  "kosko generate --env preprod : should generate a kitchen sink preprod manifest",
  async () => {
    const githubEnv = config({
      path: resolve(cwd, "./environments/.github-actions.env"),
    }).parsed;

    // Required to allow seemless integration code example
    const result = await execa.node(
      KOSKO_BIN,
      ["generate", "--env", "preprod"],
      {
        cwd,
        env: {
          ...githubEnv,
          GITHUB_REF: "v1.2.3",
          SOCIALGOUV_PREPRODUCTION: "true",
        },
      }
    );

    expect(result.stdout).toMatchSnapshot();
    expect(result.exitCode).toEqual(0);
  },
  TIMEOUT
);

test(
  "kosko generate --env prod : should generate a kitchen sink prod manifest",
  async () => {
    const githubEnv = config({
      path: resolve(cwd, "./environments/.github-actions.env"),
    }).parsed;

    // Required to allow seemless integration code example
    const result = await execa.node(KOSKO_BIN, ["generate", "--env", "prod"], {
      cwd,
      env: {
        ...githubEnv,
        GITHUB_REF: "v42.0.0",
        SOCIALGOUV_KUBE_INGRESS_BASE_DOMAIN: "fabrique.social.gouv.fr",
        SOCIALGOUV_PRODUCTION: "true",
      },
    });

    expect(result.stdout).toMatchSnapshot();
    expect(result.exitCode).toEqual(0);
  },
  TIMEOUT
);
