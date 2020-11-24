module.exports = {
  snapshotResolver: __dirname + "/../manifestSnapshotResolver.js",
  testMatch: [__dirname + "/*.js"],
  testPathIgnorePatterns: [__filename],
};
