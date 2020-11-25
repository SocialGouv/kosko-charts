import { TIMEOUT } from "e2e/templates/helpers";
import execa from "execa";
import { resolve } from "path";

//

const cwd = resolve(__dirname, "..", "__fixtures__");
test(
  "use npx to test the components",
  async () => {
    // const { stdout } = await execa("npm", ["root"]);
    const result = await execa("npx", ["jest"], {
      cwd,
      env: {
        FORCE_COLOR: "0",
      },
    });

    expect(result.stdout).toMatchInlineSnapshot(`""`);
    expect(result.exitCode).toEqual(0);
  },
  TIMEOUT
);
