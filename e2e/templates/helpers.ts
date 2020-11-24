import { resolve } from "path";

import { BIN_FOLDER, ROOT } from "../utils";

export { TIMEOUT } from "../utils";

export const KOSKO_BIN = resolve(BIN_FOLDER, "kosko");

export const template = (testFilename: string): string => {
  return resolve(__dirname, ROOT, "templates/", testFilename);
};
