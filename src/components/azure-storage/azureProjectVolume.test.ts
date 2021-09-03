import environmentMock from "@socialgouv/kosko-charts/environments/index.mock";
import { AzureFilePersistentVolumeSource } from "kubernetes-models/v1";

beforeEach(() => {
  jest.resetModules();
});

test("should create a persistent volume claim and a persistent volume", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);
  const { azureProjectVolume } = await import("./azureProjectVolume");
  expect(azureProjectVolume("foo", { storage: "42o" })).toMatchSnapshot();
});

test("for cdtnadminprodserver", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);
  const { azureProjectVolume } = await import("./azureProjectVolume");
  expect(
    azureProjectVolume("foo", {
      azureFile: new AzureFilePersistentVolumeSource({
        secretName: "azure-cdtnadmindev-volume",
        secretNamespace: "cdtn-admin",
        shareName: "cdtnadminprodserver-backup-restore",
      }),
      storage: "42o",
    })
  ).toMatchSnapshot();
});
