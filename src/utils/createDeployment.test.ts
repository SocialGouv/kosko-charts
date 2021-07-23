import type { DeploymentParams } from "./createDeployment";
import { createDeployment } from "./createDeployment";

const params: DeploymentParams = {
  containerPort: 8080,
  name: "www",
  registry: "registry.gitlab.factory.social.gouv.fr/socialgouv/sample",
  sha: "0123456789abcdefghijklmnopqrstuvwxyz0123",
};
test("should create a deployment for the commit", () => {
  expect(createDeployment(params)).toMatchSnapshot();
});

test("should create a deployment for the tag", () => {
  expect(
    createDeployment({
      ...params,
      tag: "vX.Y.Z",
    })
  ).toMatchSnapshot();
});

test("should create a deployment with custom image", () => {
  expect(
    createDeployment({
      ...params,
      image: "ghcr.io/socialgouv/foo/bar:qux",
    })
  ).toMatchSnapshot();
});

test("should create a deployment with metadata", () => {
  expect(
    createDeployment({
      ...params,
      annotations: {
        foo: "bar",
      },
      labels: {
        foo: "bar",
      },
    })
  ).toMatchSnapshot();
});

test("should create a deployment with additionnal container spec", () => {
  expect(
    createDeployment({
      ...params,
      container: {
        resources: {
          requests: {
            cpu: "500m",
          },
        },
      },
    })
  ).toMatchSnapshot();
});

test("should create a deployment with volumes", () => {
  expect(
    createDeployment({
      ...params,
      volumes: [{ emptyDir: {}, name: "foo" }],
    })
  ).toMatchSnapshot();
});

test("should create a deployment with imagePullSecrets", () => {
  expect(
    createDeployment({
      ...params,
      imagePullSecrets: [{ name: "fooSecretName" }],
    })
  ).toMatchSnapshot();
});
