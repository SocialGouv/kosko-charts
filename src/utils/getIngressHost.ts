import { ok } from "assert";
import { Ingress } from "kubernetes-models/api/networking/v1beta1/Ingress";

import { getManifestByKind } from "./getManifestByKind";

export const getIngressHost = (
  manifests: { kind: string }[]
): string | undefined => {
  //@ts-expect-error
  const ingress = getManifestByKind(manifests, Ingress) as Ingress;
  ok(ingress);
  ok(ingress.spec);
  ok(ingress.spec.rules);
  ok(ingress.spec.rules[0]);
  return ingress.spec.rules[0].host;
};
