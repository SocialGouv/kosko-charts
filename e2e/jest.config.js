const { defaults } = require("jest-config");

const ignorePatterns = ["<rootDir>/src", "<rootDir>/template", "__fixtures__"];

module.exports = {
  rootDir: "../",
  setupFilesAfterEnv: [],
  testEnvironment: "node",
  testMatch: ["<rootDir>/e2e/templates/autodevops/**/*.ts"],
  testPathIgnorePatterns: [
    ...defaults.testPathIgnorePatterns,
    ...ignorePatterns,
  ],
  watchPathIgnorePatterns: ignorePatterns,
};
