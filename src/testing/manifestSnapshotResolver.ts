import { basename, resolve } from "path";

module.exports = {
  resolveSnapshotPath: (testPath: string, snapshotExtension: string): string =>
    resolve(
      process.cwd(),
      "__manifest_snapshots__",
      basename(testPath) + snapshotExtension
    ),

  resolveTestPath: (snapshotFilePath: string, snapshotExtension: string) =>
    resolve(
      __dirname,
      "cases",
      basename(snapshotFilePath).slice(0, -snapshotExtension.length)
    ),

  testPathForConsistencyCheck: resolve(__dirname, "cases/example.js"),
};
