import environmentMock from "@socialgouv/kosko-charts/environments/index.mock";

test("should create a pg secret", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);
  const { createSecret } = await import("./index");
  const secret = createSecret("my-secret", {
    database: "some-db",
    host: "pouet.com",
    password: "passw0rd",
    user: "tester",
  });
  expect(secret).toMatchInlineSnapshot(`
Object {
  "apiVersion": "v1",
  "kind": "Secret",
  "metadata": Object {
    "annotations": Object {
      "app.gitlab.com/app": "socialgouv-sample",
      "app.gitlab.com/env": "my-test",
    },
    "labels": Object {
      "application": "www",
      "owner": "my-team",
      "team": "my-team",
    },
    "name": "my-secret",
    "namespace": "sample-42-my-test",
  },
  "stringData": Object {
    "DATABASE_URL": "postgresql://tester%40pouet.com:passw0rd@pouet.com/some-db?sslmode=require",
    "DB_URI": "postgresql://tester%40pouet.com:passw0rd@pouet.com/some-db?sslmode=require",
    "HASURA_GRAPHQL_DATABASE_URL": "postgresql://tester%40pouet.com:passw0rd@pouet.com/some-db?sslmode=require",
    "PGDATABASE": "some-db",
    "PGHOST": "pouet.com",
    "PGPASSWORD": "passw0rd",
    "PGRST_DB_URI": "postgresql://tester%40pouet.com:passw0rd@pouet.com/some-db?sslmode=require",
    "PGSSLMODE": "require",
    "PGUSER": "tester@pouet.com",
  },
}
`);
});

test("fails because of empty values", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);
  const { createSecret } = await import("./index");
  expect(() =>
    createSecret("my-secret", {
      database: "",
      host: "",
      password: "",
      sslmode: "",
      user: "",
    })
  ).toThrowErrorMatchingInlineSnapshot(`"A database should be defined"`);
  expect(() =>
    createSecret("my-secret", {
      database: "database",
      host: "",
      password: "",
      sslmode: "",
      user: "",
    })
  ).toThrowErrorMatchingInlineSnapshot(`"A user should be defined"`);
  expect(() =>
    createSecret("my-secret", {
      database: "database",
      host: "",
      password: "password",
      sslmode: "",
      user: "user",
    })
  ).toThrowErrorMatchingInlineSnapshot(`"A host should be defined"`);
  expect(() =>
    createSecret("my-secret", {
      database: "database",
      host: "host",
      password: "",
      sslmode: "",
      user: "user",
    })
  ).toThrowErrorMatchingInlineSnapshot(`"A password should be defined"`);
});
