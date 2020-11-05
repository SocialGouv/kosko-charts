import { createDbJob } from "./create-db.job";

process.env.CI_COMMIT_SHORT_SHA = "b123a99";

test("should customize secret and extensions when running create-db", () => {
  expect(
    createDbJob({
      database: "some-db",
      user: "some-user",
      password: "some-password",
      secretRefName: "some-secret",
      extensions: "some-extension",
    })
  ).toMatchSnapshot();
});

test("should use defaults when running create-db", () => {
  expect(
    createDbJob({
      database: "some-db",
      user: "some-user",
      password: "some-password",
    })
  ).toMatchSnapshot();
});
