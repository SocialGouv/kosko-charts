import type { WaitForPostgresParams } from "./waitForPostgres";
import { waitForPostgres } from "./waitForPostgres";

test("should succeed validating a valid value", () => {
  expect(waitForPostgres({} as WaitForPostgresParams)).toMatchInlineSnapshot(
    {
      image: expect.any(String),
    },
    `
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
      "image": Any<String>,
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
  `
  );
  expect(waitForPostgres({} as WaitForPostgresParams).image).toMatch(
    "registry.gitlab.factory.social.gouv.fr/socialgouv/docker/wait-for-postgres:"
  );
});

test("should generate an container with secretRefName named foobar", () => {
  expect(waitForPostgres({ secretRefName: "foobar" })).toMatchInlineSnapshot(
    {
      image: expect.any(String),
    },
    `
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
      "image": Any<String>,
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
  `
  );
  expect(waitForPostgres({} as WaitForPostgresParams).image).toMatch(
    "registry.gitlab.factory.social.gouv.fr/socialgouv/docker/wait-for-postgres:"
  );
});
