import { EnvVar } from "kubernetes-models/v1/EnvVar";

import { restoreDbJob } from "./restore-db.job";

process.env.CI_COMMIT_SHORT_SHA = "b123a99";

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
