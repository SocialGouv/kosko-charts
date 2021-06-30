import { assert } from "@sindresorhus/is";
import gitlab from "@socialgouv/kosko-charts/environments/gitlab";
import { merge } from "@socialgouv/kosko-charts/utils/@kosko/env/merge";
import type { IObjectMeta } from "kubernetes-models/apimachinery/pkg/apis/meta/v1";
import type { IResourceRequirements } from "kubernetes-models/v1";
import { PersistentVolumeClaim } from "kubernetes-models/v1";

export function fileSharePersistentVolumeClaim({
  metadata,
  resources,
}: {
  metadata: IObjectMeta;
  resources: IResourceRequirements;
}): PersistentVolumeClaim {
  assert.nonEmptyString(metadata.name);
  const globalEnv = gitlab(process.env);

  return new PersistentVolumeClaim({
    metadata: merge(
      {
        annotations: globalEnv.manifest.annotations,
        labels: globalEnv.manifest.labels,
        namespace: globalEnv.manifest.namespace.name,
      },
      metadata
    ),
    spec: {
      accessModes: ["ReadWriteMany"],
      resources,
      storageClassName: "azurefile",
    },
  });
}
