import { EnvVar } from "kubernetes-models/v1/EnvVar";

type AnyObject = Record<string, string>;


/**
 *
 * This function will return an array of [[EnvVar]] for a given object.
 *
 * ```typescript
 * import { toEnvVars } from "@socialgouv/kosko-charts/utils"
 *
 * const envVars = toEnvVars({
 *   NODE_ENV: "production",
 *   TEST: "42"
 * })
 * ```
 * @category utils
 * @return {EnvVar[]}
 */
export const toEnvVars = (dict: Record<string, string>): EnvVar[] =>
  Object.entries(dict).map(
    ([name, value]) =>
      new EnvVar({
        name,
        value,
      })
  );
