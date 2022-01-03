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

jest.mock("@kosko/yaml", () => {
  return {
    loadFile:
      (path: string, { transform }: { transform: Function }) =>
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
