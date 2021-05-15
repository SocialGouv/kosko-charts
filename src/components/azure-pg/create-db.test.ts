import { createDbJob } from "./create-db.job";

process.env.GITHUB_SHA = "b123a99";

test("should customize secret and extensions when running create-db", () => {
  expect(
    createDbJob({
      database: "some-db",
      extensions: "some-extension",
      password: "some-password",
      secretRefName: "some-secret",
      user: "some-user",
    })
  ).toMatchSnapshot();
});

test("should use defaults when running create-db", () => {
  expect(
    createDbJob({
      database: "some-db",
      password: "some-password",
      user: "some-user",
    })
  ).toMatchSnapshot();
});
