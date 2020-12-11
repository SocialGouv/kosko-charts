import { resolve } from "path";

export const ROOT = resolve(__dirname, "..");
export const BIN_FOLDER = resolve(__dirname, ROOT, "node_modules/.bin");

export const TIMEOUT = 25_000; // = 1000 * 25s
