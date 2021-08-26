import environmentMock from "@socialgouv/kosko-charts/environments/index.mock";

test("should create a pg secret", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);
  const { dropDbJob } = await import("./drop-db.job");
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
        "annotations": Object {
          "kapp.k14s.io/disable-default-label-scoping-rules": "",
          "kapp.k14s.io/disable-default-ownership-label-rules": "",
          "kapp.k14s.io/nonce": "",
          "kapp.k14s.io/update-strategy": "fallback-on-replace",
        },
        "labels": Object {
          "application": "sample",
          "component": "drop_db",
          "owner": "sample",
          "team": "sample",
        },
        "name": "drop-azure-db-0123456",
      },
      "spec": Object {
        "backoffLimit": 0,
        "template": Object {
          "metadata": Object {
            "annotations": Object {
              "kapp.k14s.io/deploy-logs": "",
            },
          },
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
    "ghcr.io/socialgouv/docker/azure-db:"
  );
});
