import environmentMock from "@socialgouv/kosko-charts/environments/index.mock";

test("should generate manifests to restore foo project", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);
  const { restoreDbFromAzureBackup } = await import(
    "./restore-db-from-azure-backup"
  );
  expect(
    restoreDbFromAzureBackup("my-server", { project: "foo" })
  ).toMatchSnapshot();
});
test("should generate manifests to restore foo project and remove all users", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);
  const { restoreDbFromAzureBackup } = await import(
    "./restore-db-from-azure-backup"
  );
  expect(
    restoreDbFromAzureBackup("my-app", {
      postRestoreScript: "DELETE * from users;",
      project: "foo",
    })
  ).toMatchSnapshot();
});
