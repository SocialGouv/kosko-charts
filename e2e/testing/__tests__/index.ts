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
    const jestOutputs = result.stderr.split("\n");
    expect(jestOutputs[0]).toMatch(/kosko generate --env/);
    expect(jestOutputs.slice(4, 7)).toMatchInlineSnapshot(`
      Array [
        "Test Suites: 3 passed, 3 total",
        "Tests:       3 passed, 3 total",
        "Snapshots:   3 passed, 3 total",
      ]
    `);
    expect(jestOutputs[8]).toMatchInlineSnapshot(`"Ran all test suites."`);
    expect(result.exitCode).toEqual(0);
  },
  TIMEOUT
);
