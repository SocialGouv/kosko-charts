import { Environment } from "@kosko/env";

import { create } from "./index";

jest.mock("@socialgouv/kosko-charts/components/app", () => ({
  create: jest.fn().mockImplementation((...args: unknown[]) => args),
}));

beforeEach(() => {
  jest.resetModules();
});

test("should create app with nginx config", () => {
  const env = new Environment("/tmp");
  const manifest = create("www", { env });
  expect(manifest).toMatchInlineSnapshot(`
    Array [
      "www",
      Object {
        "config": Object {
          "container": Object {
            "livenessProbe": Object {
              "httpGet": Object {
                "path": "/index.html",
                "port": "http",
              },
              "initialDelaySeconds": 30,
            },
            "readinessProbe": Object {
              "httpGet": Object {
                "path": "/index.html",
                "port": "http",
              },
            },
            "resources": Object {
              "limits": Object {
                "cpu": "500m",
                "memory": "128Mi",
              },
              "requests": Object {
                "cpu": "5m",
                "memory": "32Mi",
              },
            },
            "startupProbe": Object {
              "httpGet": Object {
                "path": "/index.html",
                "port": "http",
              },
            },
          },
          "containerPort": 80,
        },
        "deployment": Object {
          "labels": Object {
            "component": "nginx",
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
