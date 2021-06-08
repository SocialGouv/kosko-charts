import type { Deployment } from "kubernetes-models/apps/v1/Deployment";

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
export const getDeployment = (manifests: { kind: string }[]): Deployment =>
  manifests.find((manifest) => manifest.kind === "Deployment") as Deployment;
