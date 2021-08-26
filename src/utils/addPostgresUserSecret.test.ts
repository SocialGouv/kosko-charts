import environmentMock from "@socialgouv/kosko-charts/environments/index.mock";
import { Deployment } from "kubernetes-models/apps/v1/Deployment";

test("should add a generated Postgres user secret to a deployment", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);
  const { addPostgresUserSecret } = await import("./addPostgresUserSecret");
  const deployment = new Deployment({
    spec: {
      selector: { matchLabels: { component: "app" } },
      template: {
        spec: {
          containers: [
            {
              image: "test:42",
              name: "some-container",
            },
          ],
        },
      },
    },
  });
  addPostgresUserSecret(deployment);
  expect(deployment).toMatchSnapshot();
});

test("should add azure-pg-user to a deployment in preproduction", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => () => ({
    ...environmentMock(),
    isPreProduction: true,
  }));
  const { addPostgresUserSecret } = await import("./addPostgresUserSecret");
  const deployment = new Deployment({
    spec: {
      selector: { matchLabels: { component: "app" } },
      template: {
        spec: {
          containers: [
            {
              image: "test:42",
              name: "some-container",
            },
          ],
        },
      },
    },
  });
  addPostgresUserSecret(deployment);
  expect(deployment).toMatchSnapshot();
});

test("should add azure-pg-user to a deployment in production", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => () => ({
    ...environmentMock(),
    isProduction: true,
  }));
  const { addPostgresUserSecret } = await import("./addPostgresUserSecret");
  const deployment = new Deployment({
    spec: {
      selector: { matchLabels: { component: "app" } },
      template: {
        spec: {
          containers: [
            {
              image: "test:42",
              name: "some-container",
            },
          ],
        },
      },
    },
  });
  addPostgresUserSecret(deployment);
  expect(deployment).toMatchSnapshot();
});
