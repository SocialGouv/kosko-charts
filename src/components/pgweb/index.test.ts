import { createNodeCJSEnvironment } from "@kosko/env";

import { create } from "./index";

jest.mock("@socialgouv/kosko-charts/components/app", () => ({
  create: jest.fn().mockImplementation((...args: unknown[]) => args),
}));

beforeEach(() => {
  jest.resetModules();
  delete process.env.PRODUCTION;
});

test("should create app with pgweb config", () => {
  const env = createNodeCJSEnvironment({ cwd: "/tmp" });
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
            },
            "readinessProbe": Object {
              "httpGet": Object {
                "path": "/",
                "port": "http",
              },
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
            "startupProbe": Object {
              "httpGet": Object {
                "path": "/",
                "port": "http",
              },
            },
          },
          "containerPort": 8081,
          "image": "sosedoff/pgweb:0.11.7",
          "subDomainPrefix": "pgweb-",
          "withPostgres": true,
        },
        "deployment": Object {
          "labels": Object {
            "component": "pgweb",
          },
        },
        "env": Object {
          "component": [Function],
          "cwd": "/tmp",
          "extensions": Array [
            "cjs",
            "mjs",
          ],
          "global": [Function],
          "paths": Object {
            "component": "environments/#{environment}/#{component}",
            "global": "environments/#{environment}",
          },
          "resetReducers": [Function],
          "setReducers": [Function],
        },
      },
    ]
  `);
});

test("should create app with pgweb config for production", () => {
  process.env.PRODUCTION = "true";
  const env = createNodeCJSEnvironment({ cwd: "/tmp" });
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
            },
            "readinessProbe": Object {
              "httpGet": Object {
                "path": "/",
                "port": "http",
              },
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
            "startupProbe": Object {
              "httpGet": Object {
                "path": "/",
                "port": "http",
              },
            },
          },
          "containerPort": 8081,
          "image": "sosedoff/pgweb:0.11.7",
          "subDomainPrefix": "pgweb.",
          "withPostgres": true,
        },
        "deployment": Object {
          "labels": Object {
            "component": "pgweb",
          },
        },
        "env": Object {
          "component": [Function],
          "cwd": "/tmp",
          "extensions": Array [
            "cjs",
            "mjs",
          ],
          "global": [Function],
          "paths": Object {
            "component": "environments/#{environment}/#{component}",
            "global": "environments/#{environment}",
          },
          "resetReducers": [Function],
          "setReducers": [Function],
        },
      },
    ]
  `);
});
