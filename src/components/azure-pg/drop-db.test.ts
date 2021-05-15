import { dropDbJob } from "./drop-db.job";

process.env.GITHUB_SHA = "b123a99";

test("should customize secret and extensions when running drop-db", () => {
  expect(
    dropDbJob({
      database: "some-db",
      secretRefName: "some-secret",
      user: "some-user",
    })
  ).toMatchSnapshot();
});

test("should use defaults when running drop-db", () => {
  expect(
    dropDbJob({
      database: "some-db",
      user: "some-user",
    })
  ).toMatchSnapshot();
});
