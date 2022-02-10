import { default as koskoEnv } from "@kosko/env";
import { SealedSecret } from "@kubernetes-models/sealed-secrets/bitnami.com/v1alpha1";
import environmentMock from "@socialgouv/kosko-charts/environments/index.mock";
import { ConfigMap } from "kubernetes-models/v1";
import type { Manifest } from "templates/autodevops/types/config";

import { create } from "./index";

const mockConfigMap = new ConfigMap({
  metadata: { name: "some-config-map" },
});
const mockSealedSecret = new SealedSecret({
  metadata: { name: "some-sealed-secret" },
});

// jest will mock any import of the fs module
jest.mock("fs", () => {
  const fs = jest.requireActual("fs");
  return {
    ...fs,
    existsSync: () => true,
  };
});

beforeEach(() => {
  jest.resetAllMocks();
});

koskoEnv.env = "dev";

jest.mock("@kosko/yaml", () => {
  return {
    loadFile:
      //@ts-expect-error


        (path: string, { transform }: { transform }) =>
        (): Manifest[] | null => {
          if (/configmap.yml$/.exec(path)) {
            return [transform(mockConfigMap)] as Manifest[];
          } else if (/sealed-secret.yml$/.exec(path)) {
            return [transform(mockSealedSecret)] as Manifest[];
          }
          return null;
        },
  };
});

test("should return dev manifests", async () => {
  process.env.GITHUB_SHA = "123";
  process.env.GITHUB_REF = "456";
  process.env.GITHUB_JOB = "777";
  process.env.GITHUB_RUN_ID = "888";
  process.env.GITHUB_REPOSITORY = "socialgouv/test";
  process.env.SOCIALGOUV_BASE_DOMAIN = "fabrique.social.gouv.fr";

  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);

  const manifests = await create({
    upstream: "http://target:123",
  });
  expect(manifests).toMatchSnapshot();
});

test("should return dev manifests with custom config", async () => {
  process.env.GITHUB_SHA = "123";
  process.env.GITHUB_REF = "456";
  process.env.GITHUB_JOB = "777";
  process.env.GITHUB_RUN_ID = "888";
  process.env.GITHUB_REPOSITORY = "socialgouv/test";
  process.env.SOCIALGOUV_BASE_DOMAIN = "fabrique.social.gouv.fr";

  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);

  const manifests = await create({
    config: {
      subDomainPrefix: "metabase-",
    },
    upstream: "http://target:123",
  });
  expect(manifests).toMatchSnapshot();
});

test("should return dev manifests with custom envFrom", async () => {
  process.env.GITHUB_SHA = "123";
  process.env.GITHUB_REF = "456";
  process.env.GITHUB_JOB = "777";
  process.env.GITHUB_RUN_ID = "888";
  process.env.GITHUB_REPOSITORY = "socialgouv/test";
  process.env.SOCIALGOUV_BASE_DOMAIN = "fabrique.social.gouv.fr";

  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);

  const expectedEnvFrom = [
    {
      secretRef: { name: "another-secret" },
    },
    {
      configMapRef: { name: "another-configmap" },
    },
  ];
  const manifests = await create({
    config: {
      container: {
        envFrom: expectedEnvFrom,
      },
      subDomainPrefix: "metabase-",
    },
    upstream: "http://target:123",
  });

  // @ts-ignore
  const containerEnvFrom = manifests.find((m) => m.kind === "Deployment").spec
    .template.spec.containers[0].envFrom;
  expect(containerEnvFrom).toEqual(expectedEnvFrom);
});

test("should return proxy manifests with custom env", async () => {
  process.env.GITHUB_SHA = "123";
  process.env.GITHUB_REF = "456";
  process.env.GITHUB_JOB = "777";
  process.env.GITHUB_RUN_ID = "888";
  process.env.GITHUB_REPOSITORY = "socialgouv/test";
  process.env.SOCIALGOUV_BASE_DOMAIN = "fabrique.social.gouv.fr";

  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);

  const manifests = await create({
    config: {
      container: {
        env: [
          {
            name: "CUSTOM_VAR",
            value: "HELLO",
          },
        ],
      },
    },
    upstream: "http://target:123",
  });
  //@ts-expect-error
  const containerEnv = manifests.find((m) => m.kind === "Deployment").spec
    .template.spec.containers[0].env;
  expect(containerEnv).toMatchSnapshot();
});
