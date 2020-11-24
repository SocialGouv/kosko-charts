const { defaults } = require("jest-config");

const ignorePatterns = ["<rootDir>/src", "__fixtures__"];

module.exports = {
  rootDir: "../",
  setupFilesAfterEnv: [],
  testEnvironment: "node",
  testPathIgnorePatterns: [
    ...defaults.testPathIgnorePatterns,
    ...ignorePatterns,
  ],
  watchPathIgnorePatterns: ignorePatterns,
};
