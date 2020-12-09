import type { IIoK8sApiAppsV1DeploymentSpec } from "kubernetes-models/_definitions/IoK8sApiAppsV1DeploymentSpec";
import type { IObjectMeta } from "kubernetes-models/apimachinery/pkg/apis/meta/v1/ObjectMeta";

import { merge } from "./@kosko/env/merge";

interface Metadatas {
  annotations?: Record<string, string>;
  labels?: Record<string, string>;
  namespace: { name: string };
  name?: string;
}

function isIIoK8sApiAppsV1DeploymentSpecLike(
  spec: unknown
): spec is IIoK8sApiAppsV1DeploymentSpec {
  return Boolean(spec && (spec as { template: unknown }).template);
}

// apply some data to a manifest : annotations, labels, namespace
export const updateMetadata = (
  manifest:
    | {
        metadata?: IObjectMeta;
        spec?: IIoK8sApiAppsV1DeploymentSpec | unknown;
      }
    | undefined,
  metadata: Metadatas
): void => {
  if (!manifest) {
    return;
  }

  if (!manifest.metadata) {
    manifest.metadata = {};
  }

  manifest.metadata = merge(manifest.metadata, metadata);

  const { annotations = {}, labels = {}, namespace, name } = metadata;

  manifest.metadata.namespace = namespace.name;

  if (name) manifest.metadata.name = name;

  if (isIIoK8sApiAppsV1DeploymentSpecLike(manifest.spec)) {
    manifest.spec.template.metadata = merge(
      manifest.spec.template.metadata ?? {},
      {
        annotations,
        labels,
      }
    );
  }
};
