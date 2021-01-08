import type { Ingress } from "kubernetes-models/api/networking/v1beta1/Ingress";
import type {
  Deployment,
  Deployment as DeploymentType,
} from "kubernetes-models/apps/v1/Deployment";
import type { Service } from "kubernetes-models/v1/Service";

type ManifestType = DeploymentType | Ingress | Service;

/**
 *
 * This function will return the first [[Deployment]] of a given set of manifests
 *
 * ```typescript
 * import { getDeployment } from "@socialgouv/kosko-charts/utils"
 *
 * const deployment = getDeployment(manifests);
 * ```
 * @category utils
 * @return {Deployment}
 */
export const getDeployment = (manifests: ManifestType[]) =>
  manifests.find((manifest) => manifest.kind === "Deployment") as Deployment;
