import environmentMock from "@socialgouv/kosko-charts/environments/index.mock";
import { EnvVar } from "kubernetes-models/v1/EnvVar";

test("should create restore job from dev to dev", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);

  const { restoreContainerJob } = await import("./restore-container.job");
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

test("should create restore job from dev to prod", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);

  const { restoreContainerJob } = await import("./restore-container.job");
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

test("should create restore job from prod to prod", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);

  const { restoreContainerJob } = await import("./restore-container.job");
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

test("should create restore job from prod to dev", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);

  const { restoreContainerJob } = await import("./restore-container.job");
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
