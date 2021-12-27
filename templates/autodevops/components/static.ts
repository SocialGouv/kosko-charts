import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/nginx";
import { getGithubRegistryImagePath } from "@socialgouv/kosko-charts/utils/getGithubRegistryImagePath";
import { getHarborImagePath } from "@socialgouv/kosko-charts/utils/getHarborImagePath";
import { getManifestByKind } from "@socialgouv/kosko-charts/utils/getManifestByKind";
import { Ingress } from "kubernetes-models/networking.k8s.io/v1beta1/Ingress";

import type { Manifests } from "../types/config";
import { addIngressAnnotations } from "../utils/addIngressAnnotations";
import Config from "../utils/config";

declare type AppManifests = { kind: string }[];

export default async (): Manifests => {
  const { name, type, subdomain, ingress, registry, project, containerPort } =
    await Config();

  if (type === "static") {
    const image =
      registry === "ghcr"
        ? getGithubRegistryImagePath({ name, project: project ?? name })
        : getHarborImagePath({ name });

    const manifests = (await create(name, {
      config: { subdomain, containerPort },
      deployment: { image },
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
