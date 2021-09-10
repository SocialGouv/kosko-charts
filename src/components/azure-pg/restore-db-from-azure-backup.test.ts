import type { Environment } from "@kosko/env";
import { createNodeCJSEnvironment } from "@kosko/env";
import environmentMock from "@socialgouv/kosko-charts/environments/index.mock";
import { directory } from "tempy";

const mockloadYaml = jest.fn(async (env: Environment, path: string) =>
  Promise.resolve({
    kind: "SealSecret",
    metadata: {
      label: {
        "//0": "this is a mocked ;)",
        "//1": `for 'environments/${env.env}/${path}'`,
      },
      name: path,
    },
  })
);

test("should generate manifests to restore foo project", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);

  jest.doMock("@socialgouv/kosko-charts/utils/getEnvironmentComponent", () => ({
    loadYaml: mockloadYaml,
  }));

  const cwd = directory();
  const env = createNodeCJSEnvironment({ cwd });
  env.env = "prod";

  const { restoreDbFromAzureBackup } = await import(
    "./restore-db-from-azure-backup"
  );
  await expect(
    restoreDbFromAzureBackup("my-server", {
      azureStorageAccountBackupSecretFile:
        "restore/pg-backup.sealed-secret.yaml",
      env,
      file: "hasura_prod_db.psql.gz",
      pgAdminDevSecretFile: "restore/azure-pg-admin-user-dev.yaml",
      project: "foo",
    })
  ).resolves.toMatchSnapshot();
});
test("should generate manifests to restore foo project and remove all users", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);
  const cwd = directory();
  const env = createNodeCJSEnvironment({ cwd });
  env.env = "prod";

  const { restoreDbFromAzureBackup } = await import(
    "./restore-db-from-azure-backup"
  );

  await expect(
    restoreDbFromAzureBackup("my-app", {
      azureStorageAccountBackupSecretFile:
        "restore/pg-backup.sealed-secret.yaml",
      env,
      file: "hasura_prod_db.psql.gz",
      pgAdminDevSecretFile: "restore/azure-pg-admin-user-dev.yaml",
      postRestoreScript: "DELETE * from users;",
      project: "foo",
    })
  ).resolves.toMatchSnapshot();
});
