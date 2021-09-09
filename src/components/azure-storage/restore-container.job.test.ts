import environmentMock from "@socialgouv/kosko-charts/environments/index.mock";

test("should create restore job from dev to dev", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);

  const { restoreContainerJob } = await import("./restore-container.job");
  expect(
    restoreContainerJob("my-files", {
      from: { container: "dev-files1", volume: "dev" },
      to: { container: "dev-files2", volume: "dev" },
    })
  ).toMatchSnapshot();
});

test("should create restore job from dev to prod", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);

  const { restoreContainerJob } = await import("./restore-container.job");
  expect(
    restoreContainerJob("my-files", {
      from: { container: "dev-files", volume: "dev" },
      to: { container: "prod-files", volume: "prod" },
    })
  ).toMatchSnapshot();
});

test("should create restore job from prod to prod", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);

  const { restoreContainerJob } = await import("./restore-container.job");
  expect(
    restoreContainerJob("my-files", {
      from: { container: "prod-files1", volume: "prod" },
      to: { container: "prod-files2", volume: "prod" },
    })
  ).toMatchSnapshot();
});

test("should create restore job from prod to dev", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);

  const { restoreContainerJob } = await import("./restore-container.job");
  expect(
    restoreContainerJob("my-files", {
      from: { container: "prod-files", volume: "prod" },
      to: { container: "dev-files", volume: "dev" },
    })
  ).toMatchSnapshot();
});
