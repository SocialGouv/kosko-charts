import { dropAutodevopsDbsJob } from "./drop-autodevops-dbs.job";

process.env.CI_COMMIT_SHORT_SHA = "b123a99";
process.env.CI_COMMIT_REF_SLUG = "some-branch";

test("should use some-secret for running drop-autodevops-dbs", () => {
  expect(
    dropAutodevopsDbsJob({ secretRefName: "some-secret" })
  ).toMatchSnapshot();
});

test("should use default secret for running drop-autodevops-dbs", () => {
  expect(dropAutodevopsDbsJob()).toMatchSnapshot();
});
