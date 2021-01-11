import { resolve } from "path";

export const ROOT = resolve(__dirname, "../..");
export const BIN_FOLDER = resolve(__dirname, ROOT, "node_modules/.bin");
export const KOSKO_BIN = resolve(BIN_FOLDER, "kosko");

export const TIMEOUT = 60_000; // = 1000 * 60s

export const template = (testFilename: string): string => {
  return resolve(__dirname, ROOT, "templates/", testFilename);
};
