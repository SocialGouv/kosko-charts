import { Environment } from "@kosko/env";

import { create } from "./index";

jest.mock("@socialgouv/kosko-charts/components/app", () => ({
  create: jest.fn().mockImplementation((...args: unknown[]) => args),
}));

beforeEach(() => {
  jest.resetModules();
});

test("should create app with pgweb config", () => {
  const env = new Environment("/tmp");
  const manifest = create("pgweb", { env });
  expect(manifest).toMatchInlineSnapshot(`
    Array [
      "pgweb",
      Object {
        "config": Object {
          "container": Object {
            "livenessProbe": Object {
              "httpGet": Object {
                "path": "/",
                "port": "http",
              },
              "initialDelaySeconds": 5,
              "timeoutSeconds": 3,
            },
            "readinessProbe": Object {
              "httpGet": Object {
                "path": "/",
                "port": "http",
              },
              "initialDelaySeconds": 5,
              "timeoutSeconds": 3,
            },
            "resources": Object {
              "limits": Object {
                "cpu": "500m",
                "memory": "256Mi",
              },
              "requests": Object {
                "cpu": "100m",
                "memory": "64Mi",
              },
            },
          },
          "containerPort": 8081,
          "image": "sosedoff/pgweb:latest",
          "subDomainPrefix": "pgweb-",
          "withPostgres": true,
        },
        "deployment": Object {
          "labels": Object {
            "component": "pgweb",
          },
        },
        "env": Environment {
          "cwd": "/tmp",
          "paths": Object {
            "component": "environments/#{environment}/#{component}",
            "global": "environments/#{environment}",
          },
          "reducers": Array [
            Object {
              "name": "global",
              "reduce": [Function],
            },
            Object {
              "name": "component",
              "reduce": [Function],
            },
          ],
        },
      },
    ]
  `);
});
