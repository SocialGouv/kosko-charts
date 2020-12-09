import { EnvVar } from "kubernetes-models/v1/EnvVar";

import { restoreContainerJob } from "./restore-container.job";

process.env.CI_COMMIT_SHORT_SHA = "b123a99";

test("should create restore container job", () => {
  expect(
    restoreContainerJob({
      env: [
        new EnvVar({
          name: "SOURCE_CONTAINER",
          value: "prod-files",
        }),
        new EnvVar({
          name: "DESTINATION_CONTAINER",
          value: "preprod-files",
        }),
      ],
      project: "some-cool-project",
    })
  ).toMatchSnapshot();
});
