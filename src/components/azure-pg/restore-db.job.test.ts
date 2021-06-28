import { EnvVar } from "kubernetes-models/v1";

import { restoreDbJob } from "./restore-db.job";

process.env.CI_COMMIT_SHORT_SHA = "b123a99";
process.env.CI_PROJECT_NAME = "some-app";
process.env.CI_JOB_ID = "123456789";

jest.mock("@socialgouv/kosko-charts/environments/gitlab", () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __esModule: true,
  default: () => ({
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
  }),
}));

test("should create restore DB job", () => {
  expect(
    restoreDbJob({
      env: [
        new EnvVar({
          name: "PGDATABASE",
          value: "db_64105",
        }),
        new EnvVar({
          name: "OWNER",
          value: "user_64105",
        }),
        new EnvVar({
          name: "FILE",
          value: "product_prod_db.psql.gz",
        }),
      ],
      project: "sample-next-app",
    })
  ).toMatchSnapshot();
});

test("should create restore DB job with post-restore script", () => {
  expect(
    restoreDbJob({
      env: [
        new EnvVar({
          name: "PGDATABASE",
          value: "db_64105",
        }),
        new EnvVar({
          name: "OWNER",
          value: "user_64105",
        }),
        new EnvVar({
          name: "FILE",
          value: "product_prod_db.psql.gz",
        }),
      ],
      postRestoreScript: "DELETE * from users;",
      project: "sample-next-app",
    })
  ).toMatchSnapshot();
});
