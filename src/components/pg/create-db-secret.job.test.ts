import environmentMock from "@socialgouv/kosko-charts/environments/index.mock";

import { createDbSecretJob } from "./create-db-secret.job";

test("should create a pg create-db-secret job", () => {
  const job = createDbSecretJob({
    ciEnv: environmentMock(),
    pgPasswordSecretKeyRef: "pgpassword",
  });
  expect(job).toMatchInlineSnapshot(`
    Object {
      "apiVersion": "batch/v1",
      "kind": "Job",
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
        "name": "create-db-secret",
        "namespace": "sample-42-my-test",
      },
      "spec": Object {
        "template": Object {
          "metadata": Object {},
          "spec": Object {
            "containers": Array [
              Object {
                "args": Array [
                  "create-db-secret $",
                ],
                "command": Array [
                  "sh",
                  "-c",
                ],
                "env": Array [
                  Object {
                    "name": "K8S_NS",
                    "value": "sample-42-my-test",
                  },
                  Object {
                    "name": "PGPASSWORD_SECRET_NAME",
                    "value": "pgpassword",
                  },
                ],
                "image": "ghcr.io/socialgouv/docker/azure-db:6.64.0",
                "imagePullPolicy": "IfNotPresent",
                "name": "create-db-secret",
              },
            ],
            "restartPolicy": "OnFailure",
          },
        },
        "ttlSecondsAfterFinished": 86400,
      },
    }
  `);
});
