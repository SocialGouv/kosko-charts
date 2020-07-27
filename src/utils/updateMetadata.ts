interface Metadatas {
  // eslint-disable-next-line @typescript-eslint/ban-types
  annotations: object;
  // eslint-disable-next-line @typescript-eslint/ban-types
  labels: object;
  // eslint-disable-next-line @typescript-eslint/ban-types
  namespace: object;
  name?: string;
}

// apply some data to a manifest : annotations, labels, namespace
export const updateMetadata = (
  //@ts-expect-error
  manifest,
  { annotations = {}, labels = {}, namespace, name }: Metadatas
) => {
  if (manifest) {
    if (!manifest.metadata) {
      manifest.metadata = {};
    }
    //console.log("manifest.metadata", manifest.metadata);
    // add gitlab annotations
    manifest.metadata.annotations = {
      ...(manifest.metadata.annotations || {}),
      ...annotations,
    };
    manifest.metadata.labels = {
      ...(manifest.metadata.labels || {}),
      ...labels,
    };
    //@ts-expect-error
    manifest.metadata.namespace = namespace.name;
    if (name) manifest.metadata.name = name;

    if (manifest.spec && manifest.spec.template) {
      manifest.spec.template.metadata = {
        ...manifest.spec.template.metadata,
        annotations: {
          ...manifest.spec.template?.metadata?.annotations,
          ...annotations,
        },
        labels: {
          ...manifest.spec.template?.metadata?.labels,
          ...labels,
        },
      };
      if (name) manifest.spec.template.metadata.labels.app = name;
    }
  }
};
