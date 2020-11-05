import { dropDbJob } from "./drop-db.job";

process.env.CI_COMMIT_SHORT_SHA = "b123a99";

test("should customize secret and extensions when running drop-db", () => {
  expect(
    dropDbJob({
      database: "some-db",
      user: "some-user",
      secretRefName: "some-secret",
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
