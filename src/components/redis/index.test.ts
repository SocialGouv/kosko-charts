import { createNodeCJSEnvironment } from "@kosko/env";

import { create } from "./index";

jest.mock("@socialgouv/kosko-charts/components/app", () => ({
  create: jest.fn().mockImplementation((...args: unknown[]) => args),
}));

beforeEach(() => {
  jest.resetModules();
  delete process.env.PRODUCTION;
});

test("should create app with redis config", async () => {
  const env = createNodeCJSEnvironment({ cwd: "/tmp" });
  const manifest = await create("redis", { env });
  expect(manifest).toMatchInlineSnapshot(`
Array [
  "redis",
  Object {
    "config": Object {
      "container": Object {
        "livenessProbe": Object {
          "exec": Object {
            "command": Array [
              "sh",
              "-c",
              "redis-cli ping",
            ],
          },
          "httpGet": undefined,
        },
        "readinessProbe": Object {
          "exec": Object {
            "command": Array [
              "sh",
              "-c",
              "redis-cli ping",
            ],
          },
          "httpGet": undefined,
        },
        "startupProbe": Object {
          "exec": Object {
            "command": Array [
              "sh",
              "-c",
              "redis-cli ping",
            ],
          },
          "httpGet": undefined,
        },
      },
      "containerPort": 6379,
      "image": "redis:6.2.4-alpine3.13",
      "ingress": false,
      "subDomainPrefix": "redis-",
    },
    "deployment": Object {
      "labels": Object {
        "component": "redis",
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

test("should create app with pgweb config for production", async () => {
  process.env.PRODUCTION = "true";
  const env = createNodeCJSEnvironment({ cwd: "/tmp" });
  const manifest = await create("redis", { env });
  expect(manifest).toMatchInlineSnapshot(`
Array [
  "redis",
  Object {
    "config": Object {
      "container": Object {
        "livenessProbe": Object {
          "exec": Object {
            "command": Array [
              "sh",
              "-c",
              "redis-cli ping",
            ],
          },
          "httpGet": undefined,
        },
        "readinessProbe": Object {
          "exec": Object {
            "command": Array [
              "sh",
              "-c",
              "redis-cli ping",
            ],
          },
          "httpGet": undefined,
        },
        "startupProbe": Object {
          "exec": Object {
            "command": Array [
              "sh",
              "-c",
              "redis-cli ping",
            ],
          },
          "httpGet": undefined,
        },
      },
      "containerPort": 6379,
      "image": "redis:6.2.4-alpine3.13",
      "ingress": false,
      "subDomainPrefix": "redis.",
    },
    "deployment": Object {
      "labels": Object {
        "component": "redis",
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
