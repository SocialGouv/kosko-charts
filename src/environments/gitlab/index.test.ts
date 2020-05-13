import env from "./index";

test("should throw because of missing variables", () => {
  expect(env).toThrowErrorMatchingSnapshot();
});

test("should return the gitlab global env", () => {
  expect(
    env({
      CI_ENVIRONMENT_NAME: "fabrique-dev",
      CI_ENVIRONMENT_SLUG: "my-test",
      CI_PROJECT_NAME: "sample",
      CI_PROJECT_PATH_SLUG: "socialgouv-sample",
      CI_REGISTRY_IMAGE:
        "registry.gitlab.factory.social.gouv.fr/socialgouv/sample",
      IMAGE_TAG: "x.y.z",
      KUBE_INGRESS_BASE_DOMAIN: "dev.fabrique.social.gouv.fr",
      KUBE_NAMESPACE: "sample-42-my-test",
      RANCHER_PROJECT_ID: "c-kk8xm:p-4fxg8",
    })
  ).toMatchInlineSnapshot(`
    Object {
      "annotations": Object {
        "app.gitlab.com/app": "socialgouv-sample",
        "app.gitlab.com/env": "my-test",
        "app.gitlab.com/env.name": "fabrique-dev",
      },
      "domain": "dev.fabrique.social.gouv.fr",
      "labels": Object {
        "application": "sample",
        "owner": "sample",
        "team": "sample",
      },
      "namespace": Object {
        "name": "sample-42-my-test",
      },
      "subdomain": "my-test-sample",
    }
  `);
});
