import { assert } from "@sindresorhus/is";
import environments from "@socialgouv/kosko-charts/environments";
import { updateMetadata } from "@socialgouv/kosko-charts/utils/updateMetadata";
import { PersistentVolume, PersistentVolumeClaim } from "kubernetes-models/v1";

export function azureProjectVolume(
  name: string,
  { storage }: { storage: string }
): [PersistentVolumeClaim, PersistentVolume] {
  const ciEnv = environments(process.env);
  assert.nonEmptyObject(ciEnv.metadata.annotations);
  assert.nonEmptyObject(ciEnv.metadata.labels);

  const envName =
    ciEnv.metadata.annotations["app.gitlab.com/env"] ||
    ciEnv.metadata.labels.application;

  const metadata = {
    annotations: ciEnv.metadata.annotations,
    labels: ciEnv.metadata.labels,
    namespace: ciEnv.metadata.namespace,
  };
  const pv = `${envName}-${name}`;

  const persistentVolumeClaim = new PersistentVolumeClaim({
    metadata: {
      name,
    },
    spec: {
      accessModes: ["ReadWriteMany"],
      resources: {
        requests: {
          storage,
        },
      },
      selector: {
        matchLabels: {
          usage: pv,
        },
      },
      storageClassName: "",
    },
  });

  const persistentVolume = new PersistentVolume({
    metadata: {
      labels: {
        usage: pv,
      },
      name: pv,
    },
    spec: {
      accessModes: ["ReadWriteMany"],
      azureFile: {
        secretName: `azure-${ciEnv.metadata.labels.team}-volume`,
        secretNamespace: ciEnv.metadata.namespace.name,
        shareName: name,
      },
      capacity: {
        storage,
      },
      persistentVolumeReclaimPolicy: "Delete",
      storageClassName: "",
    },
  });

  updateMetadata(persistentVolumeClaim, metadata);
  updateMetadata(persistentVolume, metadata);
  return [persistentVolumeClaim, persistentVolume];
}
