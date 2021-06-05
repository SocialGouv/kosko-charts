//
import { project } from "@socialgouv/kosko-charts/testing/fake/github-actions.env";

const githubMock = {
  git: {},
  namespace: { name: "sample-42-my-test" },
};

const githubModuleMock = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __esModule: true,
  default: () => githubMock,
};

beforeEach(() => {
  jest.resetModules();
});

test("should create a namespace", async () => {
  jest.doMock(
    "@socialgouv/kosko-charts/environments/github",
    () => githubModuleMock
  );

  const githubEnv = project("sample").dev;
  Object.assign(process.env, githubEnv);

  const { createNamespace } = await import("./index");
  const namespace = createNamespace();
  expect(namespace).toMatchSnapshot();
});

test("should create a namespace with extra labels and annotations", async () => {
  Object.assign(githubMock, {
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
    "@socialgouv/kosko-charts/environments/github",
    () => githubModuleMock
  );
  const { createNamespace } = await import("./index");
  const namespace = createNamespace();
  expect(namespace).toMatchSnapshot();
});
