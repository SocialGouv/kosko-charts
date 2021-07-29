import environmentMock from "@socialgouv/kosko-charts/environments/index.mock";
import { EnvVar } from "kubernetes-models/v1";

test("should create restore DB job", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);
  const { restoreDbJob } = await import("./restore-db.job");
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

test("should create restore DB job with post-restore script", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);
  const { restoreDbJob } = await import("./restore-db.job");
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
