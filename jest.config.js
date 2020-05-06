const { defaults } = require("jest-config");

const ignorePatterns = ["<rootDir>/e2e"];

module.exports = {
  testEnvironment: "node",
  testPathIgnorePatterns: [
    ...defaults.testPathIgnorePatterns,
    ...ignorePatterns,
  ],
  watchPathIgnorePatterns: ignorePatterns,
};
