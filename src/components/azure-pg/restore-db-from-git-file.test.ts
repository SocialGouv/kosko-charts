import environmentMock from "@socialgouv/kosko-charts/environments/index.mock";

test("should create restore DB job from github my-dump.sql file", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);
  const { restoreDbFromFile } = await import("./restore-db-from-git-file");
  expect(
    restoreDbFromFile("my-restore-db", {
      filePath: "my-dump.sql",
      repository: "SocialGouv/sample-next-app",
    })
  ).toMatchSnapshot();
});

test("should create restore DB job from gitlab my-dump.sql file", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);
  const { restoreDbFromFile } = await import("./restore-db-from-git-file");
  expect(
    restoreDbFromFile("my-restore-db", {
      filePath: "my-dump.sql",
      repository:
        "https://gitlab.factory.social.gouv.fr/SocialGouv/sample-next-app/sample-next-app",
    })
  ).toMatchSnapshot();
});
