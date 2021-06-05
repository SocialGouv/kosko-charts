import { getGitlabRegistryImagePath } from "./getGitlabRegistryImagePath";

beforeEach(() => {
  process.env.CI_COMMIT_SHA = "2780ce341781678fe1f460742e87312fbabd827f";
});

test("custom ghcr project with param with commit sha", () => {
  expect(
    getGitlabRegistryImagePath({
      name: "frontend",
      project: "socialgouv/some-project",
    })
  ).toStrictEqual(
    "registry.gitlab.factory.social.gouv.fr/socialgouv/some-project/frontend:2780ce341781678fe1f460742e87312fbabd827f"
  );
});

test("custom registry with tag", () => {
  process.env.CI_COMMIT_TAG = "v1.2.3";
  expect(
    getGitlabRegistryImagePath({
      name: "frontend",
      project: "socialgouv/some-project",
    })
  ).toStrictEqual(
    "registry.gitlab.factory.social.gouv.fr/socialgouv/some-project/frontend:1.2.3"
  );
});
