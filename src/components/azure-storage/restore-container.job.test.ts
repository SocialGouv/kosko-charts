import { EnvVar } from "kubernetes-models/v1/EnvVar";

import { restoreContainerJob } from "./restore-container.job";

process.env.GITHUB_SHA = "b123a99";

test("should create restore job from dev to dev", () => {
  expect(
    restoreContainerJob({
      env: [
        new EnvVar({
          name: "SOURCE_CONTAINER",
          value: "dev-files1",
        }),
        new EnvVar({
          name: "DESTINATION_CONTAINER",
          value: "dev-files2",
        }),
      ],
      from: "dev",
      project: "some-cool-project",
      to: "dev",
    })
  ).toMatchSnapshot();
});

test("should create restore job from dev to prod", () => {
  expect(
    restoreContainerJob({
      env: [
        new EnvVar({
          name: "SOURCE_CONTAINER",
          value: "dev-files1",
        }),
        new EnvVar({
          name: "DESTINATION_CONTAINER",
          value: "prod-files2",
        }),
      ],
      from: "dev",
      project: "some-cool-project",
      to: "prod",
    })
  ).toMatchSnapshot();
});

test("should create restore job from prod to prod", () => {
  expect(
    restoreContainerJob({
      env: [
        new EnvVar({
          name: "SOURCE_CONTAINER",
          value: "prod-files1",
        }),
        new EnvVar({
          name: "DESTINATION_CONTAINER",
          value: "prod-files2",
        }),
      ],
      from: "prod",
      project: "some-cool-project",
      to: "prod",
    })
  ).toMatchSnapshot();
});

test("should create restore job from prod to dev", () => {
  expect(
    restoreContainerJob({
      env: [
        new EnvVar({
          name: "SOURCE_CONTAINER",
          value: "prod-files1",
        }),
        new EnvVar({
          name: "DESTINATION_CONTAINER",
          value: "dev-files2",
        }),
      ],
      from: "prod",
      project: "some-cool-project",
      to: "dev",
    })
  ).toMatchSnapshot();
});
