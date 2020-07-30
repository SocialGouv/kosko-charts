import { merge } from "./merge";

interface Metadatas {
  annotations: Record<string, string>;
  labels: Record<string, string>;
  namespace: { name: string };
  name?: string;
}

// apply some data to a manifest : annotations, labels, namespace
export const updateMetadata = (
  //@ts-expect-error
  manifest,
  metadata: Metadatas
): void => {
  if (manifest) {
    if (!manifest.metadata) {
      manifest.metadata = {};
    }

    manifest.metadata = merge(manifest.metadata, metadata);

    const { annotations = {}, labels = {}, namespace, name } = metadata;

    manifest.metadata.namespace = namespace.name;

    if (name) manifest.metadata.name = name;

    if (manifest.spec && manifest.spec.template) {
      manifest.spec.template.metadata = merge(
        manifest.spec.template.metadata || {},
        {
          annotations,
          labels,
        }
      );
    }
  }
};
