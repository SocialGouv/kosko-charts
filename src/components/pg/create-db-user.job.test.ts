import { createDbUserJob } from "./create-db-user.job";

test("should create a pg create-db-user job", () => {
  const job = createDbUserJob({
    database: "test",
    user: "test",
  });
  expect(job).toMatchInlineSnapshot(`
    Object {
      "apiVersion": "batch/v1",
      "kind": "Job",
      "spec": Object {
        "backoffLimit": 5,
        "template": Object {
          "metadata": Object {
            "annotations": Object {
              "kapp.k14s.io/deploy-logs": "for-new",
            },
          },
          "spec": Object {
            "containers": Array [
              Object {
                "command": Array [
                  "create-db-user",
                ],
                "env": Array [
                  Object {
                    "name": "NEW_DB_NAME",
                    "value": "test",
                  },
                  Object {
                    "name": "NEW_USER",
                    "value": "test",
                  },
                  Object {
                    "name": "NEW_PASSWORD",
                    "valueFrom": Object {
                      "secretKeyRef": Object {
                        "key": "PGPASSWORD",
                        "name": "pgpassword",
                      },
                    },
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
                "image": "ghcr.io/socialgouv/docker/azure-db:6.63.0",
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
  `);
});
