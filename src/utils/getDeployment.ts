import type { Ingress } from "kubernetes-models/api/networking/v1beta1/Ingress";
import type {
  Deployment,
  Deployment as DeploymentType,
} from "kubernetes-models/apps/v1/Deployment";
import type { Service } from "kubernetes-models/v1/Service";

type ManifestType = DeploymentType | Ingress | Service;

export const getDeployment = (manifests: ManifestType[]) =>
  manifests.find((manifest) => manifest.kind === "Deployment") as Deployment;
