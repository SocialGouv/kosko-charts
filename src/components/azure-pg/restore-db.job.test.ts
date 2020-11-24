import { EnvVar } from "kubernetes-models/v1/EnvVar";

import { restoreDbJob } from "./restore-db.job";

process.env.CI_COMMIT_SHORT_SHA = "b123a99";

test("should create restore DB job", () => {
  expect(
    restoreDbJob({
      project: "some-classy-project",
      env: [
        new EnvVar({
          name: "PGUSER",
          value: "pg-admin-user",
        }),
        new EnvVar({
          name: "PGHOST",
          value: "pg-host",
        }),
        new EnvVar({
          name: "PGPASSWORD",
          value: "pg-password",
        }),
        new EnvVar({
          name: "PGDATABASE",
          value: "target-bdd",
        }),
        new EnvVar({
          name: "OWNER",
          value: "target-owner",
        }),
        new EnvVar({
          name: "FILE",
          value: "target-file.psql.gz",
        }),
      ],
    })
  ).toMatchSnapshot();
});
