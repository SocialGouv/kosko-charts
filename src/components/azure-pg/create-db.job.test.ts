import { createDbJob } from "./create-db.job";

test("should create a pg secret", () => {
  process.env.GITHUB_SHA = "1234567";
  const job = createDbJob({
    database: "some-db",
    password: "my-password",
    user: "tester",
  });
  expect(job).toMatchInlineSnapshot(
    {
      spec: {
        template: { spec: { containers: [{ image: expect.any(String) }] } },
      },
    },
    `
    Object {
      "apiVersion": "batch/v1",
      "kind": "Job",
      "spec": Object {
        "backoffLimit": 5,
        "template": Object {
          "spec": Object {
            "containers": Array [
              Object {
                "command": Array [
                  "create-db-user",
                ],
                "env": Array [
                  Object {
                    "name": "NEW_DB_NAME",
                    "value": "some-db",
                  },
                  Object {
                    "name": "NEW_USER",
                    "value": "tester",
                  },
                  Object {
                    "name": "NEW_PASSWORD",
                    "value": "my-password",
                  },
                  Object {
                    "name": "NEW_DB_EXTENSIONS",
                    "value": "hstore pgcrypto citext uuid-ossp",
                  },
                ],
                "envFrom": Array [
                  Object {
                    "secretRef": Object {
                      "name": "azure-pg-admin-user",
                    },
                  },
                ],
                "image": Any<String>,
                "imagePullPolicy": "IfNotPresent",
                "name": "create-db-user",
                "resources": Object {
                  "limits": Object {
                    "cpu": "300m",
                    "memory": "256Mi",
                  },
                  "requests": Object {
                    "cpu": "100m",
                    "memory": "64Mi",
                  },
                },
              },
            ],
            "restartPolicy": "Never",
          },
        },
        "ttlSecondsAfterFinished": 86400,
      },
    }
  `
  );
  expect(job.spec?.template.spec?.containers[0].image).toMatch(
    "ghcr.io/socialgouv/docker/azure-db:"
  );
});
