import { ResourceRequirements } from "kubernetes-models/v1";

import { fileSharePersistentVolumeClaim } from "./fileshare.pvc";

jest.mock("@socialgouv/kosko-charts/environments/gitlab", () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __esModule: true,
  default: () => ({
    manifest: {
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
  const pvc = fileSharePersistentVolumeClaim({
    metadata: { name: "foobar" },
    resources: new ResourceRequirements({ requests: { storage: "5Gi" } }),
  });
  expect(pvc).toMatchSnapshot();
  expect(() => {
    pvc.validate();
  }).not.toThrow();
});
