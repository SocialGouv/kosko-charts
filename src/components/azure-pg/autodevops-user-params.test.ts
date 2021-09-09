import environmentMock from "@socialgouv/kosko-charts/environments/index.mock";

test("should create a pg secret", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);
  const { autodevopsPgUserParams: pgUserParams } = await import(
    "./autodevops-user-params"
  );
  const params = pgUserParams("suffix");
  expect(params).toMatchInlineSnapshot(`
Object {
  "database": "autodevops_suffix",
  "host": "sampledevserver.postgres.database.azure.com",
  "name": "azure-pg-user-suffix",
  "password": "password_suffix",
  "user": "user_suffix",
}
`);
});
