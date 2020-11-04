/* eslint-disable sort-keys-fix/sort-keys-fix */
import { dropAutodevopsDbsJob } from "./drop-autodevops-dbs.job";

test("should use some-secret for running drop-autodevops-dbs", () => {
  expect(
    dropAutodevopsDbsJob({ secretRefName: "some-secret" })
  ).toMatchSnapshot();
});

test("should use default secret for running drop-autodevops-dbs", () => {
  expect(dropAutodevopsDbsJob()).toMatchSnapshot();
});
