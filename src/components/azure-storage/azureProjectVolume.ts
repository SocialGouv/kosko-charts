import { assert } from "@sindresorhus/is";
import gitlab from "@socialgouv/kosko-charts/environments/gitlab";
import { updateMetadata } from "@socialgouv/kosko-charts/utils/updateMetadata";
import { PersistentVolume, PersistentVolumeClaim } from "kubernetes-models/v1";

export function azureProjectVolume(
  name: string,
  { storage }: { storage: string }
): [PersistentVolumeClaim, PersistentVolume] {
  const globalEnv = gitlab(process.env);
  assert.nonEmptyObject(globalEnv.metadata.annotations);
  assert.nonEmptyObject(globalEnv.metadata.labels);

  const envName = globalEnv.metadata.annotations["app.gitlab.com/env"];
  const metadata = {
    annotations: globalEnv.metadata.annotations,
    labels: globalEnv.metadata.labels,
    namespace: globalEnv.metadata.namespace,
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
        secretName: `azure-${globalEnv.metadata.labels.team}-volume`,
        secretNamespace: globalEnv.metadata.namespace.name,
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
