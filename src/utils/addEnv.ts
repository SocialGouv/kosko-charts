import { assert } from "@sindresorhus/is";
import type { Deployment } from "kubernetes-models/apps/v1/Deployment";
import type { EnvVar } from "kubernetes-models/v1/EnvVar";

/** Parameters for the [[addEnv]] function */
export interface AddEnvParams {
  /** [[Deployment]] to add env for */
  deployment: Deployment;
  /** The [[EnvVar]] to add */
  data: EnvVar;
  /** The container index for which to add the env var, default=0 */
  containerIndex?: number;
}

/**
 *
 * This function will add an [[EnvVar]] to the first container of a given [[Deployment]]
 *
 * ```typescript
 * import { addEnv } from "@socialgouv/kosko-charts/utils"
 *
 * addEnv({
 *   deployment,
 *   data: new EnvVar({
 *     name: "MY_VARIABLE",
 *     value: "some value"
 *   })
 * })
 * ```
 * @category utils
 * @return {void}
 */
export const addEnv = ({
  deployment,
  data,
  containerIndex = 0,
}: AddEnvParams): void => {
  assert.object(deployment.spec);
  assert.object(deployment.spec.template.spec);
  const container = deployment.spec.template.spec.containers[containerIndex];
  container.env = container.env ?? [];
  container.env.push(data);
};
