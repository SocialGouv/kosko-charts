//
import { config } from "dotenv";
import { KOSKO_BIN, template, TIMEOUT } from "e2e/templates/helpers";
import execa from "execa";
import { basename, resolve } from "path";

//

const cwd = template(basename(resolve(__dirname, "..", "..")));

test(
  "--env prod : should generate prod manifest",
  async () => {
    const gitlabEnv = config({
      path: resolve(cwd, "./environments/.gitlab-ci.env"),
    }).parsed;
    // Required to allow seemless integration code example
    const result = await execa.node(
      KOSKO_BIN,
      ["generate", "--env", "prod", "!(_*)"],
      {
        cwd,
        env: {
          ...gitlabEnv,
          CI_COMMIT_TAG: "v1.2.3",
          CI_ENVIRONMENT_NAME: "prod2",
          CI_ENVIRONMENT_SLUG: "prod2",
          KUBE_INGRESS_BASE_DOMAIN: "fabrique.social.gouv.fr",
          PRODUCTION: "true",
        },
      }
    );

    expect(result.stdout).toMatchSnapshot();
    expect(result.exitCode).toEqual(0);
  },
  TIMEOUT
);
