import { assert } from "@sindresorhus/is";
import type { Deployment } from "kubernetes-models/apps/v1/Deployment";
import type { StatefulSet } from "kubernetes-models/apps/v1/StatefulSet";
import type { EnvFromSource } from "kubernetes-models/v1/EnvFromSource";

type Manifest = Deployment | StatefulSet;

/** Parameters for the [[addToEnvFrom]] function */
export interface AddToEnvFromParams {
  /** [[Deployment]] to add env for */
  deployment: Manifest;
  /** The [[EnvFromSource]] to add */
  data: EnvFromSource[];
  /** The container index for which to add the env var, default=0 */
  containerIndex?: number;
}

/**
 *
 * This function will add an [[EnvFromSource]] to the first container of a given [[Deployment]]
 *
 * Useful to get all variables from a [[ConfigMap]] or a [[Secret]]
 *
 * ```typescript
 * import { addToEnvFrom } from "@socialgouv/kosko-charts/utils"
 *
 * addToEnvFrom(deployment, new EnvFromSource({
 *   secretRef: {
 *     name: "some-secret"
 *   }
 * }))
 * ```
 * @category utils
 * @return {void}
 */
export const addToEnvFrom = ({
  deployment,
  data,
  containerIndex = 0,
}: AddToEnvFromParams): void => {
  assert.object(deployment.spec);
  assert.object(deployment.spec.template.spec);
  const container = deployment.spec.template.spec.containers[containerIndex];
  container.envFrom = container.envFrom ?? [];
  container.envFrom.push(...data);
};
