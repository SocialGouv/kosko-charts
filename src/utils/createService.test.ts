//

import createService from "./createService";

test("should create a dev ingress", () => {
  expect(
    createService({
      containerPort: 8080,
      name: "my-service",
      selector: { app: "my-app" },
      servicePort: 80,
    })
  ).toMatchInlineSnapshot(`
    Object {
      "apiVersion": "v1",
      "kind": "Service",
      "metadata": Object {
        "labels": Object {
          "app": "my-service",
        },
        "name": "my-service",
      },
      "spec": Object {
        "ports": Array [
          Object {
            "name": "http",
            "port": 80,
            "targetPort": 8080,
          },
        ],
        "selector": Object {
          "app": "my-app",
        },
        "type": "ClusterIP",
      },
    }
  `);
});

test("should create service with an ftp port name", () => {
  process.env.PRODUCTION = "true";
  expect(
    createService({
      containerPort: 8020,
      name: "my-service",
      portName: "ftp",
      selector: { app: "my-app" },
      servicePort: 20,
    })
  ).toMatchInlineSnapshot(`
    Object {
      "apiVersion": "v1",
      "kind": "Service",
      "metadata": Object {
        "labels": Object {
          "app": "my-service",
        },
        "name": "my-service",
      },
      "spec": Object {
        "ports": Array [
          Object {
            "name": "ftp",
            "port": 20,
            "targetPort": 8020,
          },
        ],
        "selector": Object {
          "app": "my-app",
        },
        "type": "ClusterIP",
      },
    }
  `);
});
