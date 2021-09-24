//

import environmentMock from "@socialgouv/kosko-charts/environments/index.mock";

beforeEach(() => {
  jest.resetModules();
});

test("should create a namespace", async () => {
  jest.doMock(
    "@socialgouv/kosko-charts/environments/gitlab",
    () => environmentMock
  );

  const { createNamespace } = await import("./index");
  const namespace = createNamespace();
  expect(namespace).toMatchSnapshot();
});

test("should create a namespace with extra labels and annotations", async () => {
  jest.doMock(
    "@socialgouv/kosko-charts/environments/gitlab",
    () => environmentMock
  );
  const { createNamespace } = await import("./index");
  const namespace = createNamespace();
  expect(namespace).toMatchSnapshot();
  expect(
    namespace.metadata &&
      namespace.metadata.annotations &&
      namespace.metadata.annotations["janitor/ttl"]
  ).toEqual("7d");
});

test("renovate : should create a namespace with 1 day duration", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments/gitlab", () => () => ({
    ...environmentMock(),
    branch: "renovate/pouet",
  }));
  const { createNamespace } = await import("./index");
  const namespace = createNamespace();
  expect(namespace).toMatchSnapshot();
  expect(
    namespace.metadata &&
      namespace.metadata.annotations &&
      namespace.metadata.annotations["janitor/ttl"]
  ).toEqual("1d");
});

test("should NOT add janitor annotation if keepAlive set to true", async () => {
  jest.doMock(
    "@socialgouv/kosko-charts/environments/gitlab",
    () => environmentMock
  );
  const { createNamespace } = await import("./index");
  const namespace = createNamespace({ keepAlive: true });
  expect(
    namespace.metadata &&
      namespace.metadata.annotations &&
      namespace.metadata.annotations["janitor/ttl"]
  ).toBeUndefined();
});

test("should NOT add janitor annotation for preprod", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => () => ({
    ...environmentMock(),
    isPreProduction: true,
    isProduction: false,
    tag: "v1.2.3",
  }));
  jest.doMock(
    "@socialgouv/kosko-charts/environments/gitlab",
    () => environmentMock
  );
  const { createNamespace } = await import("./index");
  const namespace = createNamespace();
  expect(
    namespace.metadata &&
      namespace.metadata.annotations &&
      namespace.metadata.annotations["janitor/ttl"]
  ).toBeUndefined();
});

test("should NOT add janitor annotation for prod", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => () => ({
    ...environmentMock(),
    isPreProduction: true,
    isProduction: true,
    tag: "v1.2.3",
  }));
  jest.doMock(
    "@socialgouv/kosko-charts/environments/gitlab",
    () => environmentMock
  );
  const { createNamespace } = await import("./index");
  const namespace = createNamespace();
  expect(
    namespace.metadata &&
      namespace.metadata.annotations &&
      namespace.metadata.annotations["janitor/ttl"]
  ).toBeUndefined();
});
