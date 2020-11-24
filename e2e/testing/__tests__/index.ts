import { TIMEOUT } from "e2e/templates/helpers";
import execa from "execa";
import { resolve } from "path";

//

const cwd = resolve(__dirname, "..", "__fixtures__");
test(
  "use npx to test the components",
  async () => {
    const { stdout } = await execa("npm", ["root"]);
    const result = await execa(
      "npx",
      [
        "jest",
        "--config",
        resolve(
          stdout,
          "@socialgouv/kosko-charts/testing/cases/jest.config.js"
        ),
      ],
      {
        cwd,
        env: {
          FORCE_COLOR: "0",
        },
      }
    );

    expect(result.stdout).toMatchInlineSnapshot(`""`);
    expect(result.exitCode).toEqual(0);
  },
  TIMEOUT
);
