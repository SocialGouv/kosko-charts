//

const gitlabMock = {
  isPreProduction: false,
  isProduction: false,
  metadata: {
    git: {},
    namespace: { name: "sample-42-my-test" },
  },
  projectName: "sample",
  shortSha: "abcdefg",
};

const gitlabModuleMock = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __esModule: true,
  default: () => gitlabMock,
};

beforeEach(() => {
  jest.resetModules();
});

test("should create a namespace", async () => {
  jest.doMock(
    "@socialgouv/kosko-charts/environments/gitlab",
    () => gitlabModuleMock
  );

  const { createNamespace } = await import("./index");
  const namespace = createNamespace();
  expect(namespace).toMatchSnapshot();
});

test("should create a namespace with extra labels and annotations", async () => {
  Object.assign(gitlabMock.metadata, {
    annotations: {
      "app.gitlab.com/app": "socialgouv-sample",
      "app.gitlab.com/env": "my-test",
    },
    git: {
      branch: "my-branch",
      remote: "my-origin",
    },
    labels: {
      application: "sample",
      owner: "sample",
      team: "sample",
    },
    rancherId: "rancherId",
  });
  jest.doMock(
    "@socialgouv/kosko-charts/environments/gitlab",
    () => gitlabModuleMock
  );
  const { createNamespace } = await import("./index");
  const namespace = createNamespace();
  expect(namespace).toMatchSnapshot();
  expect(
    namespace.metadata &&
      namespace.metadata.annotations &&
      namespace.metadata.annotations["janitor/ttl"]
  ).toEqual("15d");
});

test("should NOT add janitor annotation if keepAlive set to true", async () => {
  Object.assign(gitlabMock, {
    isPreProduction: false,
    isProduction: false,
  });
  jest.doMock(
    "@socialgouv/kosko-charts/environments/gitlab",
    () => gitlabModuleMock
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
  Object.assign(gitlabMock, {
    isPreProduction: true,
    isProduction: false,
  });
  jest.doMock(
    "@socialgouv/kosko-charts/environments/gitlab",
    () => gitlabModuleMock
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
  Object.assign(gitlabMock, {
    isPreProduction: false,
    isProduction: true,
  });
  jest.doMock(
    "@socialgouv/kosko-charts/environments/gitlab",
    () => gitlabModuleMock
  );
  const { createNamespace } = await import("./index");
  const namespace = createNamespace();
  expect(
    namespace.metadata &&
      namespace.metadata.annotations &&
      namespace.metadata.annotations["janitor/ttl"]
  ).toBeUndefined();
});
