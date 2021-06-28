import { createNodeCJSEnvironment } from "@kosko/env";
import { project } from "@socialgouv/kosko-charts/testing/fake/gitlab-ci.env";
import { promises } from "fs";
import { directory } from "tempy";

import { create } from "./index";

jest.mock("@socialgouv/kosko-charts/environments/gitlab", () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __esModule: true,
  default: () => ({
    isProduction: "true",
    manifest: {
      annotations: {
        "app.gitlab.com/app": "socialgouv-sample",
        "app.gitlab.com/env": "my-test",
      },
      domain: "fabrique.social.gouv.fr",
      labels: {
        application: "sample",
        owner: "sample",
        team: "sample",
      },
      namespace: { name: "sample-42-my-test" },
      subdomain: "sample",
    },
    projectName: "sample",
    shorSha: "abcdefg",
  }),
}));

beforeEach(() => {
  jest.resetModules();
});

// test("should throw because of a missing envs", async () => {
//   const env = createNodeCJSEnvironment({ cwd: "/tmp" });
//   await expect(async () =>
//     create("app", { env })
//   ).rejects.toThrowErrorMatchingSnapshot();
// });

test("should return dev manifests", async () => {
  const gitlabEnv = project("sample").dev;
  Object.assign(process.env, gitlabEnv);
  const cwd = directory();
  const env = createNodeCJSEnvironment({ cwd });
  env.env = "dev";
  await promises.mkdir(`${cwd}/environments/dev`, { recursive: true });
  expect(await create("app", { env })).toMatchSnapshot();
});

test("should return prod manifests", async () => {
  const gitlabEnv = project("sample").prod;
  Object.assign(process.env, gitlabEnv);
  const cwd = directory();
  const env = createNodeCJSEnvironment({ cwd });
  env.env = "prod";
  await promises.mkdir(`${cwd}/environments/prod`, { recursive: true });
  expect(await create("app", { env })).toMatchSnapshot();
});

// test("should return preprod manifests with NO custom subdomain", async () => {
//   jest.mock("@socialgouv/kosko-charts/environments/gitlab", () => ({
//     // eslint-disable-next-line @typescript-eslint/naming-convention
//     __esModule: true,
//     default: () => ({
//       isPreProduction: "true",
//       manifest: {
//         annotations: {
//           "app.gitlab.com/app": "socialgouv-sample",
//           "app.gitlab.com/env": "my-test",
//         },
//         domain: "fabrique.social.gouv.fr",
//         labels: {
//           application: "sample",
//           owner: "sample",
//           team: "sample",
//         },
//         namespace: { name: "sample-42-my-test" },
//         subdomain: "sample",
//       },
//       projectName: "sample",
//       shorSha: "abcdefg",
//     }),
//   }));

//   const gitlabEnv = project("sample").preprod;
//   Object.assign(process.env, gitlabEnv);
//   const cwd = directory();
//   const env = createNodeCJSEnvironment({ cwd });
//   env.env = "preprod";
//   await promises.mkdir(`${cwd}/environments/preprod`, { recursive: true });
//   expect(
//     await create("app", {
//       config: {
//         subdomain: "another",
//       },
//       env,
//     })
//   ).toMatchSnapshot();
// });

test("should return prod manifests with custom subdomain", async () => {
  const gitlabEnv = project("sample").prod;
  Object.assign(process.env, gitlabEnv);
  const cwd = directory();
  const env = createNodeCJSEnvironment({ cwd });
  env.env = "prod";
  await promises.mkdir(`${cwd}/environments/prod`, { recursive: true });
  expect(
    await create("app", {
      config: {
        subdomain: "another",
      },
      env,
    })
  ).toMatchSnapshot();
});

test("should return prod manifests without custom subdomain if undefined", async () => {
  const gitlabEnv = project("sample").prod;
  Object.assign(process.env, gitlabEnv);
  const cwd = directory();
  const env = createNodeCJSEnvironment({ cwd });
  env.env = "prod";
  await promises.mkdir(`${cwd}/environments/prod`, { recursive: true });
  expect(
    await create("app", {
      config: {
        subdomain: undefined,
      },
      env,
    })
  ).toMatchSnapshot();
});
