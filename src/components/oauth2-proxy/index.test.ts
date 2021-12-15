import environmentMock from "@socialgouv/kosko-charts/environments/index.mock";

import { create } from "./index";
import { ConfigMap } from "kubernetes-models/v1";
import { SealedSecret } from "@kubernetes-models/sealed-secrets/bitnami.com/v1alpha1";

const mockConfigMap = new ConfigMap({
  metadata: { name: "some-config-map" },
});
const mockSealedSecret = new SealedSecret({
  metadata: { name: "some-sealed-secret" },
});

jest.mock("@kosko/yaml", () => {
  return {
    loadFile:
      (path: any, { transform }: any) =>
      () => {
        if (path.match(/configmap.yml$/)) {
          return [transform(mockConfigMap)];
        } else if (path.match(/sealed-secret.yml$/)) {
          return [transform(mockSealedSecret)];
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
