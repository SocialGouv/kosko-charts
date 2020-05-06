/* eslint-disable @typescript-eslint/no-var-requires */
//

import { dirname, join } from "path";
import { Environment } from "@kosko/env";

const chartPath = dirname(__dirname);

beforeEach(() => {
  jest.resetModules();
});

test("should return a namespace", () => {
  const { default: components, namespace } = require("../components/namespace");

  expect(components).toStrictEqual([namespace]);
});

test("should return a local namespace", () => {
  const env = new Environment(chartPath);
  env.paths.global = "environments/#{environment}/global";
  env.env = ["local"];

  process.env.USERNAME = "momo";

  jest.doMock("@kosko/env", () => ({
    __esModule: true,
    default: env,
  }));

  const { namespace } = require("../components/namespace");

  expect(() => namespace.validate()).not.toThrow();
  expect(namespace).toMatchInlineSnapshot(`
    Object {
      "apiVersion": "v1",
      "kind": "Namespace",
      "metadata": Object {
        "labels": Object {
          "app": "cdtn-veille-git-localhost-momo",
          "cert": "wildcard",
        },
        "name": "cdtn-veille-git-localhost-momo",
      },
    }
  `);
});

test("should return a gitlab namespace", () => {
  const env = new Environment(chartPath);
  env.paths.global = "environments/#{environment}/global";
  env.env = ["gitlab"];

  jest.doMock("@kosko/env", () => ({
    __esModule: true,
    default: env,
  }));

  require("dotenv").config({ path: join(__dirname, ".gitlab.env") });

  // then
  const { namespace } = require("../components/namespace");

  expect(() => namespace.validate()).not.toThrow();
  expect(namespace).toMatchInlineSnapshot(`
    Object {
      "apiVersion": "v1",
      "kind": "Namespace",
      "metadata": Object {
        "annotations": Object {
          "app.gitlab.com/app": "socialgouv-sample",
          "app.gitlab.com/env": "fabrique-dev",
          "field.cattle.io/projectId": "c-kk8xm:p-4fxg8",
        },
        "labels": Object {
          "app": "sample-42-fabrique-dev",
          "application": "sample",
          "cert": "wildcard",
          "owner": "sample",
          "team": "sample",
        },
        "name": "sample-42-fabrique-dev",
      },
    }
  `);
});
