import createIngress from "./createIngress";

process.env.CI_COMMIT_SHORT_SHA = "b123a99";
process.env.CI_PROJECT_NAME = "some-app";
process.env.CI_JOB_ID = "123456789";
process.env.CI_ENVIRONMENT_NAME = "fabrique-dev";
process.env.CI_ENVIRONMENT_SLUG = "my-test";
process.env.CI_PROJECT_PATH_SLUG = "socialgouv-sample";
process.env.KUBE_INGRESS_BASE_DOMAIN = "dev2.fabrique.social.gouv.fr";
process.env.KUBE_NAMESPACE = "sample-42-my-test";

beforeEach(() => {
  delete process.env.PRODUCTION;
});

test("should create a dev ingress", () => {
  expect(
    createIngress({
      hosts: ["sample.dev2.fabrique.social.gouv.fr"],
      name: "my-ingress",
      serviceName: "www",
      servicePort: 80,
    })
  ).toMatchSnapshot();
});

test("should create a prod ingress", () => {
  process.env.PRODUCTION = "true";
  expect(
    createIngress({
      hosts: ["sample.dev2.fabrique.social.gouv.fr"],
      name: "my-ingress",
      serviceName: "www",
      servicePort: 80,
    })
  ).toMatchSnapshot();
});

test("should create an ingress with multiple hosts", () => {
  expect(
    createIngress({
      hosts: [
        "sample.dev2.fabrique.social.gouv.fr",
        "www.sample.dev2.fabrique.social.gouv.fr",
      ],
      name: "my-ingress",
      serviceName: "www",
      servicePort: 80,
    })
  ).toMatchSnapshot();
});
