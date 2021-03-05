import type { Deployment } from "kubernetes-models/apps/v1/Deployment";
import { EnvVar } from "kubernetes-models/v1/EnvVar";

import { addEnv } from "./addEnv";

type AnyObject = Record<string, string>;

/** Parameters for the [[addEnvs]] function */
interface AddEnvsParams {
  /** [[Deployment]] to add env vars for */
  deployment: Deployment;
  /** an object with all env vars to add */
  data: AnyObject;
  /** The container index for which to add the env var, default=0 */
  containerIndex?: number;
}

/**
 *
 * This function will add a bunch of [[EnvVar]] to the first container of a given [[Deployment]]
 * EnvVars are given as an object
 *
 * ```typescript
 * import { addEnvs } from "@socialgouv/kosko-charts/utils"
 *
 * addEnvs({
 *   deployment,
 *   data: {
 *     NODE_ENV: "production",
 *     TEST: "42"
 *   }
 * })
 * ```
 * @category utils
 * @return {void}
 */
export const addEnvs = ({
  deployment,
  data,
  containerIndex = 0,
}: AddEnvsParams) => {
  Object.keys(data).forEach((key) => {
    addEnv({
      containerIndex,
      data: new EnvVar({ name: key, value: data[key] }),
      deployment,
    });
  });
};
