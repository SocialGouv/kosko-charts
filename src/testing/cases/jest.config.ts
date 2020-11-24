module.exports = {
  // HACK(douglasduteil): allow jest to look for tests in node_modules
  // As we will be using this config from the node_modules in project,
  // we need to let jest-haste-map explore the node_modules ;)
  // see https://github.com/facebook/jest/issues/2145
  haste: {
    providesModuleNodeModules: ["@socialgouv/kosko-charts"],
  },
  modulePathIgnorePatterns: ["<rootDir>/node_modules/"],
  snapshotResolver: __dirname + "/../manifestSnapshotResolver.js",
  testMatch: [__dirname + "/*.js"],
  testPathIgnorePatterns: [__filename, "<rootDir>/node_modules/"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};
