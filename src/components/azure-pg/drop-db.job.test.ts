import { dropDbJob } from "./drop-db.job";

test("should create a pg secret", () => {
  process.env.CI_COMMIT_SHORT_SHA = "1234567";
  process.env.CI_COMMIT_REF_SLUG = "some-branch";
  const job = dropDbJob({
    database: "some-db",
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
      "metadata": Object {
        "name": "drop-azure-db-1234567",
      },
      "spec": Object {
        "backoffLimit": 0,
        "template": Object {
          "metadata": Object {},
          "spec": Object {
            "containers": Array [
              Object {
                "command": Array [
                  "drop-db-user",
                ],
                "env": Array [
                  Object {
                    "name": "DROP_DATABASE",
                    "value": "some-db",
                  },
                  Object {
                    "name": "DROP_USER",
                    "value": "tester",
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
                "name": "drop-db-user",
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
    "registry.gitlab.factory.social.gouv.fr/socialgouv/docker/azure-db:"
  );
});

test("fails because of missing CI_COMMIT_SHORT_SHA", () => {
  delete process.env.CI_COMMIT_SHORT_SHA;
  expect(() =>
    dropDbJob({
      database: "some-db",
      user: "tester",
    })
  ).toThrowErrorMatchingInlineSnapshot(`
    "Wrong environment variables
    required \\"CI_COMMIT_SHORT_SHA\\": \\"undefined\\" should be defined
    "
  `);
});
