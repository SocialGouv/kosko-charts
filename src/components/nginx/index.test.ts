import { createNodeCJSEnvironment } from "@kosko/env";

import { create } from "./index";

jest.mock("@socialgouv/kosko-charts/components/app", () => ({
  create: jest.fn().mockImplementation((...args: unknown[]) => args),
}));

beforeEach(() => {
  jest.resetModules();
});

test("should create app with nginx config", async () => {
  const env = createNodeCJSEnvironment({ cwd: "/tmp" });
  const manifest = await create("www", { env });
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
      "labels": Object {
        "component": "nginx",
      },
    },
    "deployment": undefined,
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
