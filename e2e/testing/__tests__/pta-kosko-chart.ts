//
import { config } from "dotenv";
import { TIMEOUT } from "e2e/templates/helpers";
// eslint-disable-next-line import/default
import execa from "execa";
import { resolve } from "path";

import { BIN_FOLDER, ROOT } from "../../utils";

//

const PTA_BIN = resolve(BIN_FOLDER, "pta");
const cwd = resolve(__dirname, "..");

test(
  "pta generate --env dev : should generate a kitchen sink dev manifest",
  async () => {
    // Required to allow seemless integration code example
    const result = await execa(
      "ts-node",
      [
        PTA_BIN,
        "--module-loader",
        "cjs",
        resolve(ROOT, "testing/cases/*.js"),
        // resolve("@socialgouv/kosko-charts/testing/cases"),
        // "testing",
      ], // assert-snapshot
      {
        cwd,
      }
    );

    expect(
      result.stdout.replaceAll(ROOT, "@").replaceAll(/ # \d+ms/g, " # Xms")
    ).toMatchSnapshot();
    expect(result.exitCode).toEqual(0);
  },
  TIMEOUT
);
