//

import type { IIoK8sApiCoreV1Container } from "kubernetes-models/_definitions/IoK8sApiCoreV1Container";
import { Deployment } from "kubernetes-models/apps/v1/Deployment";

import { addInitContainer } from "./addInitContainer";

test("should add an init container", () => {
  const deployment = new Deployment({
    spec: {
      selector: {},
      template: {},
    },
  });
  const initContainer: IIoK8sApiCoreV1Container = {
    name: "my-init-container",
  };
  expect(addInitContainer(deployment, initContainer)).toMatchInlineSnapshot(`
    Object {
      "apiVersion": "apps/v1",
      "kind": "Deployment",
      "spec": Object {
        "selector": Object {},
        "template": Object {
          "spec": Object {
            "containers": Array [],
            "initContainers": Array [
              Object {
                "name": "my-init-container",
              },
            ],
          },
        },
      },
    }
  `);
});

test("should do nothing if the deployment has no spec", () => {
  const deployment = new Deployment();
  const initContainer: IIoK8sApiCoreV1Container = {
    name: "my-init-container",
  };
  expect(addInitContainer(deployment, initContainer)).toMatchInlineSnapshot(`
    Object {
      "apiVersion": "apps/v1",
      "kind": "Deployment",
    }
  `);
});
