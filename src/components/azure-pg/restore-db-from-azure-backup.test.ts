import environmentMock from "@socialgouv/kosko-charts/environments/index.mock";

test("from from", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);
  const { restoreDbFromAzureBackup } = await import(
    "./restore-db-from-azure-backup"
  );
  expect(
    restoreDbFromAzureBackup("my-restore-db", { project: "foo" })
  ).toMatchSnapshot();
});
