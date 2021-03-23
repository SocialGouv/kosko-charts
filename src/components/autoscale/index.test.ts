//

import { Deployment } from "kubernetes-models/apps/v1/Deployment";

beforeEach(() => {
  jest.resetModules();
});

test("should create an autoscale for a deployment", async () => {
  jest.doMock(
    "@socialgouv/kosko-charts/environments/gitlab",
    () => gitlabModuleMock
  );

  const deployment = new Deployment({
    metadata: {
      name: "foo",
      namespace: "foo-namespace",
    },
  });

  const { createAutoscale } = await import("./index");

  const hpa = createAutoscale(deployment);

  expect(hpa).toMatchSnapshot();
});

test("should create an autoscale with custom spec", async () => {
  jest.doMock(
    "@socialgouv/kosko-charts/environments/gitlab",
    () => gitlabModuleMock
  );

  const deployment = new Deployment({
    metadata: {
      name: "foo",
      namespace: "foo-namespace",
    },
  });

  const { createAutoscale } = await import("./index");

  const hpa = createAutoscale(deployment, {
    maxReplicas: 4,
    metrics: [
      {
        resource: {
          name: "cpu",
          target: {
            averageUtilization: 50,
            type: "Utilization",
          },
        },
        type: "Resource",
      },
    ],
    minReplicas: 2,
  });

  expect(hpa).toMatchSnapshot();
});

test("fails if without metadata on target", async () => {
  const deployment = new Deployment({});

  const { createAutoscale } = await import("./index");
  expect(() => createAutoscale(deployment)).toThrowErrorMatchingInlineSnapshot(
    `"Missing metadata.name on target"`
  );
});

test("fails if without name on target", async () => {
  const deployment = new Deployment({
    metadata: {
      namespace: "foo-namespace",
    },
  });

  const { createAutoscale } = await import("./index");
  expect(() => createAutoscale(deployment)).toThrowErrorMatchingInlineSnapshot(
    `"Missing metadata.name on target"`
  );
});

test("fails if without namespace on target", async () => {
  const deployment = new Deployment({ metadata: { name: "foo" } });

  const { createAutoscale } = await import("./index");
  expect(() => createAutoscale(deployment)).toThrowErrorMatchingInlineSnapshot(
    `"Missing metadata.namespace on target"`
  );
});
