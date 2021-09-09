import environmentMock from "@socialgouv/kosko-charts/environments/index.mock";

test("should return a job to create a database", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);
  const { createDbJob } = await import("./create-db.job");
  const job = createDbJob("foobar", {
    database: "some-db",
    password: "my-password",
    user: "tester",
  });
  expect(job).toMatchSnapshot({
    spec: {
      template: {
        spec: {
          containers: [
            {
              image: expect.stringMatching(
                "ghcr.io/socialgouv/docker/azure-db:"
              ),
            },
          ],
        },
      },
    },
  });
});
