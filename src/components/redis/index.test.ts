import { Environment } from "@kosko/env";

import { create } from "./index";

jest.mock("@socialgouv/kosko-charts/components/app", () => ({
  create: jest.fn().mockImplementation((...args: unknown[]) => args),
}));

beforeEach(() => {
  jest.resetModules();
  delete process.env.PRODUCTION;
});

test("should create app with redis config", () => {
  const env = new Environment("/tmp");
  const manifest = create("redis", { env });
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
          "image": "redis:6.0.9",
          "ingress": false,
          "subDomainPrefix": "redis-",
        },
        "deployment": Object {
          "labels": Object {
            "component": "redis",
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

test("should create app with pgweb config for production", () => {
  process.env.PRODUCTION = "true";
  const env = new Environment("/tmp");
  const manifest = create("redis", { env });
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
          "image": "redis:6.0.9",
          "ingress": false,
          "subDomainPrefix": "redis.",
        },
        "deployment": Object {
          "labels": Object {
            "component": "redis",
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
