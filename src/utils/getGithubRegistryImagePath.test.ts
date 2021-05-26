import { getGithubRegistryImagePath } from "./getGithubRegistryImagePath";

beforeEach(() => {
  process.env.CI_COMMIT_SHA = "2780ce341781678fe1f460742e87312fbabd827f";
});

test("custom harbor project with param with commit sha", () => {
  expect(
    getGithubRegistryImagePath({ name: "frontend", project: "some-project" })
  ).toStrictEqual(
    "ghcr.io/socialgouv/some-project/frontend:2780ce341781678fe1f460742e87312fbabd827f"
  );
});
