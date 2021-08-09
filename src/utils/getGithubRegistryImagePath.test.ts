import { getGithubRegistryImagePath } from "./getGithubRegistryImagePath";

beforeEach(() => {
  process.env.GITHUB_JOB = "xxxxxxx-job";
  process.env.GITHUB_REF = "refs/heads/e2e-branch";
  process.env.GITHUB_REPOSITORY = "socialgouv/sample-next-app";
  process.env.GITHUB_RUN_ID = "12345";
  process.env.GITHUB_SHA = "2780ce341781678fe1f460742e87312fbabd827f";
  process.env.KUBE_NAMESPACE = "sample-next-app-24-e2e-branch-42";
  process.env.RANCHER_PROJECT_ID = "c-bd7z2:p-7ms8p";
  process.env.SOCIALGOUV_BASE_DOMAIN = "dev2.fabrique.social.gouv.fr";
});

test("custom ghcr project with param with commit sha", () => {
  expect(
    getGithubRegistryImagePath({ name: "frontend", project: "some-project" })
  ).toStrictEqual(
    "ghcr.io/socialgouv/some-project/frontend:sha-2780ce341781678fe1f460742e87312fbabd827f"
  );
});

test("custom registry with tag", () => {
  process.env.GITHUB_REF = "refs/tags/v1.2.3";
  expect(
    getGithubRegistryImagePath({ name: "frontend", project: "some-project" })
  ).toStrictEqual("ghcr.io/socialgouv/some-project/frontend:1.2.3");
});
