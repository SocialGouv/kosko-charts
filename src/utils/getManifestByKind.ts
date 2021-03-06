import type { Ingress } from "kubernetes-models/api/networking/v1beta1/Ingress";
import type { Deployment } from "kubernetes-models/apps/v1/Deployment";

type ManifestType = Deployment | Ingress;

/**
 *
 * This function will return the first Manifest in a given set of manifests
 *
 * ```typescript
 * import { getManifestByKind } from "@socialgouv/kosko-charts/utils"
 * import type { Ingress } from "kubernetes-models/api/networking/v1beta1/Ingress";
 *
 * const deployment = getManifestByKind(manifests, Ingress);
 * ```
 * @category utils
 * @return {ManifestType}
 */
export const getManifestByKind = (
  manifests: { kind: string }[],
  manifestType: ManifestType
): Deployment | Ingress | undefined =>
  //@ts-expect-error
  manifests.find(
    (manifest: { kind: string }) => manifest.kind === manifestType.kind
  );
