import type { Ingress } from "kubernetes-models/api/networking/v1beta1/Ingress";
import type { Deployment } from "kubernetes-models/apps/v1/Deployment";

type ManifestType = Deployment | Ingress;

export const getManifestByKind = (
  manifests: { kind: string }[],
  manifestType: ManifestType
): Deployment | Ingress | undefined =>
  manifests.find(
    (manifest: { kind: string }) => manifest.kind === manifestType.kind
  );
