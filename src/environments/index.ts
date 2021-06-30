import type { CIEnv } from "@socialgouv/kosko-charts/types";

import github from "./github";
import gitlab from "./gitlab";

type ProcessEnv = Record<string, string | undefined>;

export default (env: ProcessEnv): CIEnv => {
  const { SOCIALGOUV_BASE_DOMAIN } = env;
  return SOCIALGOUV_BASE_DOMAIN ? github(env) : gitlab(env);
};
