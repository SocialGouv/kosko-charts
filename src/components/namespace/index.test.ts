//

const gitlabMock = {
  git: {},
  namespace: { name: "sample-42-my-test" },
};

const gitlabModuleMock = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __esModule: true,
  default: () => gitlabMock,
};

beforeEach(() => {
  jest.resetModules();
  process.env.GITHUB_RUN_ID = "123456";
  process.env.GITHUB_JOB = "9879786";
  process.env.GITHUB_REPOSITORY = "some-org/some-app";
  process.env.GITHUB_SHA = "a23b784cd23";
  process.env.SOCIALGOUV_KUBE_INGRESS_BASE_DOMAIN =
    "dev2.fabrique.social.gouv.fr";
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
  Object.assign(gitlabMock, {
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
});
