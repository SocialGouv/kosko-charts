import { ROOT, TIMEOUT } from "e2e/templates/helpers";
import execa from "execa";
import { resolve } from "path";

//

const cwd = resolve(__dirname, "..");
test(
  "use npx to test the components",
  async () => {
    // Required to allow seemless integration code example
    const result = await execa(
      "npx",
      ["jest", "--config", resolve(ROOT, "testing/cases/jest.config.js")],
      {
        cwd,
      }
    );

    expect(result.stdout).toMatchInlineSnapshot(`""`);
    expect(result.exitCode).toEqual(0);
  },
  TIMEOUT
);
