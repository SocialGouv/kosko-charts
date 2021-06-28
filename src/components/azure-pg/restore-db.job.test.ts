import { EnvVar } from "kubernetes-models/v1";

import { restoreDbJob } from "./restore-db.job";

process.env.CI_COMMIT_SHORT_SHA = "b123a99";
process.env.CI_PROJECT_NAME = "some-app";
process.env.CI_JOB_ID = "123456789";
process.env.CI_ENVIRONMENT_NAME = "fabrique-dev";
process.env.CI_ENVIRONMENT_SLUG = "my-test";
process.env.CI_PROJECT_PATH_SLUG = "socialgouv-sample";
process.env.KUBE_INGRESS_BASE_DOMAIN = "dev2.fabrique.social.gouv.fr";
process.env.KUBE_NAMESPACE = "sample-42-my-test";

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
