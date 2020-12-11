import { createSecret } from "./index";

test("should create a pg secret", () => {
  const secret = createSecret({
    database: "some-db",
    host: "pouet.com",
    password: "passw0rd",
    user: "tester",
  });
  expect(secret).toMatchInlineSnapshot(`
    Object {
      "apiVersion": "v1",
      "kind": "Secret",
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

test("fails because of empty values", () => {
  expect(() =>
    createSecret({
      database: "",
      host: "",
      password: "",
      sslmode: "",
      user: "",
    })
  ).toThrowErrorMatchingInlineSnapshot(`"A database should be defined"`);
  expect(() =>
    createSecret({
      database: "database",
      host: "",
      password: "",
      sslmode: "",
      user: "",
    })
  ).toThrowErrorMatchingInlineSnapshot(`"A user should be defined"`);
  expect(() =>
    createSecret({
      database: "database",
      host: "",
      password: "password",
      sslmode: "",
      user: "user",
    })
  ).toThrowErrorMatchingInlineSnapshot(`"A host should be defined"`);
  expect(() =>
    createSecret({
      database: "database",
      host: "host",
      password: "",
      sslmode: "",
      user: "user",
    })
  ).toThrowErrorMatchingInlineSnapshot(`"A password should be defined"`);
});
