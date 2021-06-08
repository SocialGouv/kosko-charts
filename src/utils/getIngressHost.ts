import { ok } from "assert";
import { Ingress } from "kubernetes-models/networking.k8s.io/v1/Ingress";

import { getManifestByKind } from "./getManifestByKind";

/**
 *
 * This function will return the first hostname found in a given list of manifests
 *
 * ```typescript
 * import { getIngressHost } from "@socialgouv/kosko-charts/utils"
 *
 * const host = getIngressHost(manifests);
 * ```
 * @category utils
 * @return {string}
 */
export const getIngressHost = (manifests: { kind: string }[]): string => {
  //@ts-expect-error
  const ingress = getManifestByKind(manifests, Ingress) as Ingress;
  ok(ingress);
  ok(ingress.spec);
  ok(ingress.spec.rules);
  ok(ingress.spec.rules[0]);
  ok(ingress.spec.rules[0].host);
  return ingress.spec.rules[0].host;
};
