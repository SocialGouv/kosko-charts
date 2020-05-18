import { GlobalEnvironment } from "@socialgouv/kosko-charts/types";

import { create, Params } from "./index";

test("should throw because of missing variables", () => {
  expect(create).toThrowErrorMatchingSnapshot();
});
test("should throw because the namespace name is empty", () => {
  expect(() =>
    create({
      namespace: { name: "" },
    } as Params)
  ).toThrowErrorMatchingSnapshot();
});

test("should return a namespace", () => {
  expect(
    create({
      namespace: { name: "sample-42-my-test" },
    } as Params)
  ).toMatchInlineSnapshot(`
    Object {
      "namespace": Object {
        "apiVersion": "v1",
        "kind": "Namespace",
        "metadata": Object {
          "labels": Object {
            "app": "sample-42-my-test",
          },
          "name": "sample-42-my-test",
        },
      },
    }
  `);
});

test("should return a namespace with extra labels and annotations", () => {
  const global: Partial<GlobalEnvironment> = {
    namespace: { name: "sample-42-my-test" },
    labels: {
      team: "sample",
      application: "sample",
      owner: "sample",
    },
    annotations: {
      "app.gitlab.com/app": "socialgouv-sample",
      "app.gitlab.com/env": "my-test",
    },
  };
  expect(create(global as Params)).toMatchInlineSnapshot(`
    Object {
      "namespace": Object {
        "apiVersion": "v1",
        "kind": "Namespace",
        "metadata": Object {
          "annotations": Object {
            "app.gitlab.com/app": "socialgouv-sample",
            "app.gitlab.com/env": "my-test",
          },
          "labels": Object {
            "app": "sample-42-my-test",
            "application": "sample",
            "owner": "sample",
            "team": "sample",
          },
          "name": "sample-42-my-test",
        },
      },
    }
  `);
});
