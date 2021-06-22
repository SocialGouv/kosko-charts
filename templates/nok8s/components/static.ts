import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/nginx";
import { getHarborImagePath } from "@socialgouv/kosko-charts/utils/getHarborImagePath";
import { getManifestByKind } from "@socialgouv/kosko-charts/utils/getManifestByKind";
import { Ingress } from "kubernetes-models/networking.k8s.io/v1beta1/Ingress";

import type { Manifests } from "../types/config";
import { addIngressAnnotations } from "../utils/addIngressAnnotations";
import Config from "../utils/config";

declare type AppManifests = { kind: string }[];

export default async (): Manifests => {
  const { name, type, subdomain, ingress } = await Config();
  if (type === "static") {
    const manifests = (await create(name, {
      config: { subdomain },
      deployment: {
        image: getHarborImagePath({ name }),
      },
      env,
    })) as AppManifests;

    if (ingress && ingress.annotations) {
      const deploymentIngress = getManifestByKind(
        manifests,
        //@ts-expect-error
        Ingress
      ) as Ingress;
      addIngressAnnotations(deploymentIngress, ingress.annotations);
    }

    return manifests;
  }
  return [];
};
