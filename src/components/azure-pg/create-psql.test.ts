import { createPsqlJob } from "./create-psql.job";

process.env.CI_COMMIT_SHORT_SHA = "b123a99";

test("should create a psql job", () => {
  expect(
    createPsqlJob({
      database: "some-db",
      script: "SELECT VERSION();",
      secretRefName: "some-secret",
    })
  ).toMatchSnapshot();
});

test("should use admin secret as default", () => {
  expect(
    createPsqlJob({
      database: "some-db2",
      script: "SELECT VERSION();",
    })
  ).toMatchSnapshot();
});
