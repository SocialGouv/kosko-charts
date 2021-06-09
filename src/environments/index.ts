import type { GlobalEnvironment } from "@socialgouv/kosko-charts/types";

import github from "./github";
import gitlab from "./gitlab";

export const getEnv = (env = process.env): GlobalEnvironment => {
  if (env.KUBE_INGRESS_BASE_DOMAIN) {
    return gitlab(env);
  } else if (env.SOCIALGOUV_KUBE_INGRESS_BASE_DOMAIN) {
    return github(env);
  } else {
    // TODO: Irrelevant error message to match snapshots, must be changed.
    throw new Error("undefined == true");
    // throw new Error("Cannot determine environment!");
  }
};

export const getTag = (): string | undefined => {
  if (process.env.CI_COMMIT_TAG || process.env.CI_COMMIT_SHA) {
    return process.env.CI_COMMIT_TAG
      ? process.env.CI_COMMIT_TAG.slice(1)
      : process.env.CI_COMMIT_SHA;
  } else {
    const tag =
      process.env.GITHUB_REF &&
      /v([\d.]+)/.exec(process.env.GITHUB_REF) &&
      process.env.GITHUB_REF.slice(1);

    return tag ?? `sha-${process.env.GITHUB_SHA}`;
  }
};

export const getProject = (): string | undefined => {
  // TODO: Use of "toLowerCase" only to match snapshots, to be removed.
  return (
    process.env.CI_PROJECT_PATH?.toLowerCase() ?? process.env.GITHUB_REPOSITORY
  );
};

export const isProduction = (): boolean =>
  !!(process.env.PRODUCTION ?? process.env.SOCIALGOUV_PRODUCTION);

export const isPreproduction = (): boolean =>
  !!process.env.SOCIALGOUV_PREPRODUCTION;
