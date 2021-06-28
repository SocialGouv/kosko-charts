import { assert } from "@sindresorhus/is";
import gitlab from "@socialgouv/kosko-charts/environments/gitlab";
import { updateMetadata } from "@socialgouv/kosko-charts/utils/updateMetadata";
import { PersistentVolume, PersistentVolumeClaim } from "kubernetes-models/v1";

export function azureProjectVolume(
  name: string,
  { storage }: { storage: string }
): [PersistentVolumeClaim, PersistentVolume] {
  const globalEnv = gitlab(process.env);
  assert.nonEmptyObject(globalEnv.manifest.labels);

  const application = globalEnv.manifest.labels.application;
  const metadata = {
    annotations: globalEnv.manifest.annotations ?? {},
    labels: globalEnv.manifest.labels,
    namespace: globalEnv.manifest.namespace,
  };
  const pv = `${application}-${name}`;

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
        secretName: `azure-${globalEnv.manifest.labels.team}-volume`,
        secretNamespace: globalEnv.manifest.namespace.name,
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
