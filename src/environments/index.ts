import type { CIEnv } from "@socialgouv/kosko-charts/types";

import github from "./github";
import gitlab from "./gitlab";

export default (env: typeof process.env): CIEnv => {
  const { SOCIALGOUV_BASE_DOMAIN } = env;
  return SOCIALGOUV_BASE_DOMAIN ? github(env) : gitlab(env);
};
