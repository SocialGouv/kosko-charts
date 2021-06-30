import { azureProjectVolume } from "./azureProjectVolume";

jest.mock("@socialgouv/kosko-charts/environments/gitlab", () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __esModule: true,
  default: () => ({
    metadata: {
      annotations: {
        "app.gitlab.com/app": "socialgouv-sample",
        "app.gitlab.com/env": "my-test",
      },
      labels: {
        application: "sample",
        owner: "sample",
        team: "sample",
      },
      namespace: { name: "sample-42-my-test" },
    },
    projectName: "sample",
    shortSha: "abcdefg",
  }),
}));

beforeEach(() => {
  jest.resetModules();
});

test("should create a persistent volume claim and a persistent volume", () => {
  expect(azureProjectVolume("foo", { storage: "42o" })).toMatchSnapshot();
});
