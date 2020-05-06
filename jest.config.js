const { defaults } = require("jest-config");

const ignorePatterns = ["<rootDir>/e2e"];

module.exports = {
  collectCoverageFrom: ["charts/**/*.ts"],
  testEnvironment: "node",
  testPathIgnorePatterns: [
    ...defaults.testPathIgnorePatterns,
    ...ignorePatterns,
  ],
  watchPathIgnorePatterns: ignorePatterns,
};
