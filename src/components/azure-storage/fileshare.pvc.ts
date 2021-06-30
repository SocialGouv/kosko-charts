import { assert } from "@sindresorhus/is";
import gitlab from "@socialgouv/kosko-charts/environments/gitlab";
import { merge } from "@socialgouv/kosko-charts/utils/@kosko/env/merge";
import type { IObjectMeta } from "kubernetes-models/apimachinery/pkg/apis/meta/v1";
import type { ResourceRequirements } from "kubernetes-models/v1";
import { PersistentVolumeClaim } from "kubernetes-models/v1";

export function fileSharePersistentVolumeClaim({
  metadata,
  resources,
}: {
  metadata: IObjectMeta;
  resources: ResourceRequirements;
}): PersistentVolumeClaim {
  assert.nonEmptyString(metadata.name);
  const globalEnv = gitlab(process.env);

  return new PersistentVolumeClaim({
    metadata: merge(
      {
        annotations: globalEnv.annotations,
        labels: globalEnv.labels,
        namespace: globalEnv.namespace.name,
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
