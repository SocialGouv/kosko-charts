import { getHarborImagePath } from "./getHarborImagePath";

beforeEach(() => {
  process.env.HARBOR_PREGISTRY = "default-registry";
  process.env.HARBOR_PROJECT = "default-project";
  process.env.CI_COMMIT_SHA = "2780ce341781678fe1f460742e87312fbabd827f";
});

test("default harbor path with commit sha", () => {
  expect(getHarborImagePath({ name: "frontend" })).toStrictEqual(
    "harbor.fabrique.social.gouv.fr/default-project/frontend:2780ce341781678fe1f460742e87312fbabd827f"
  );
});

test("custom harbor projet with env var with commit sha", () => {
  process.env.HARBOR_PROJECT = "some-project";
  expect(getHarborImagePath({ name: "frontend" })).toStrictEqual(
    "harbor.fabrique.social.gouv.fr/some-project/frontend:2780ce341781678fe1f460742e87312fbabd827f"
  );
});

test("custom harbor project with param with commit sha", () => {
  process.env.HARBOR_PROJECT = "some-project";
  expect(
    getHarborImagePath({ name: "frontend", project: "yet-another-project" })
  ).toStrictEqual(
    "harbor.fabrique.social.gouv.fr/yet-another-project/frontend:2780ce341781678fe1f460742e87312fbabd827f"
  );
});

test("custom params with commit sha", () => {
  expect(
    getHarborImagePath({
      name: "frontend",
      project: "awesome-project",
      registry: "my-registry",
    })
  ).toStrictEqual(
    "my-registry/awesome-project/frontend:2780ce341781678fe1f460742e87312fbabd827f"
  );
});

test("custom registry with tag", () => {
  process.env.HARBOR_PROJECT = "another-project";
  process.env.HARBOR_REGISTRY = "another-registry";
  process.env.CI_COMMIT_TAG = "v1.2.3";
  expect(getHarborImagePath({ name: "frontend" })).toStrictEqual(
    "another-registry/another-project/frontend:1.2.3"
  );
});
