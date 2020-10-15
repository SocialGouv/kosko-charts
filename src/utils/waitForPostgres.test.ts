import { waitForPostgres, WaitForPostgresParams } from "./waitForPostgres";

test("should succeed validating a valid value", () => {
  expect(waitForPostgres({} as WaitForPostgresParams)).toMatchInlineSnapshot(`
    Object {
      "env": Array [
        Object {
          "name": "WAIT_FOR_RETRIES",
          "value": "24",
        },
      ],
      "envFrom": Array [
        Object {
          "secretRef": Object {
            "name": "azure-pg-user",
          },
        },
      ],
      "image": "registry.gitlab.factory.social.gouv.fr/socialgouv/docker/wait-for-postgres:1.60.0",
      "imagePullPolicy": "Always",
      "name": "wait-for-postgres",
      "resources": Object {
        "limits": Object {
          "cpu": "20m",
          "memory": "32Mi",
        },
        "requests": Object {
          "cpu": "5m",
          "memory": "16Mi",
        },
      },
    }
  `);
});

test("should generate an container with secretRefName named foobar", () => {
  expect(waitForPostgres({ secretRefName: "foobar" })).toMatchInlineSnapshot(`
    Object {
      "env": Array [
        Object {
          "name": "WAIT_FOR_RETRIES",
          "value": "24",
        },
      ],
      "envFrom": Array [
        Object {
          "secretRef": Object {
            "name": "foobar",
          },
        },
      ],
      "image": "registry.gitlab.factory.social.gouv.fr/socialgouv/docker/wait-for-postgres:1.60.0",
      "imagePullPolicy": "Always",
      "name": "wait-for-postgres",
      "resources": Object {
        "limits": Object {
          "cpu": "20m",
          "memory": "32Mi",
        },
        "requests": Object {
          "cpu": "5m",
          "memory": "16Mi",
        },
      },
    }
  `);
});
