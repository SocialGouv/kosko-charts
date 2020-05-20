/* eslint-disable @typescript-eslint/restrict-template-expressions */
//

import { fold } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";
import { drawForest } from "fp-ts/lib/Tree";
import * as D from "io-ts/lib/Decoder";

import { GlobalEnvironment } from "@socialgouv/kosko-charts/types";

export const NonEmptyString: D.Decoder<string> = D.refinement(
  D.string,
  (s: unknown): s is string => typeof s === "string" && s.length > 0,
  "NonEmptyString"
);

const GitlabProcessEnv = D.intersection(
  D.type({
    CI_ENVIRONMENT_NAME: NonEmptyString,
    CI_ENVIRONMENT_SLUG: NonEmptyString,
    CI_PROJECT_NAME: NonEmptyString,
    CI_PROJECT_PATH_SLUG: NonEmptyString,
    KUBE_INGRESS_BASE_DOMAIN: NonEmptyString,
    KUBE_NAMESPACE: NonEmptyString,
  }),
  D.partial({
    CI_COMMIT_TAG: NonEmptyString,
    PRODUCTION: D.string,
  })
);

type GitlabProcessEnv = D.TypeOf<typeof GitlabProcessEnv>;

function assertValidEnv(env: typeof process.env): GitlabProcessEnv {
  /* eslint-disable @typescript-eslint/unbound-method */
  return pipe(
    env,
    GitlabProcessEnv.decode,
    fold(
      (errorForest) => {
        throw new Error(["BadArgument:", drawForest(errorForest)].join(""));
      },
      (env) => ({
        CI_COMMIT_TAG: env.CI_COMMIT_TAG,
        CI_ENVIRONMENT_NAME: env.CI_ENVIRONMENT_NAME,
        CI_ENVIRONMENT_SLUG: env.CI_ENVIRONMENT_SLUG,
        CI_PROJECT_NAME: env.CI_PROJECT_NAME,
        CI_PROJECT_PATH_SLUG: env.CI_PROJECT_PATH_SLUG,
        KUBE_INGRESS_BASE_DOMAIN: env.KUBE_INGRESS_BASE_DOMAIN,
        KUBE_NAMESPACE: env.KUBE_NAMESPACE,
        PRODUCTION: env.PRODUCTION,
      })
    )
  );
}

export default (env = process.env): GlobalEnvironment => {
  const {
    CI_COMMIT_TAG,
    CI_ENVIRONMENT_NAME,
    CI_ENVIRONMENT_SLUG,
    CI_PROJECT_NAME,
    CI_PROJECT_PATH_SLUG,
    KUBE_INGRESS_BASE_DOMAIN,
    KUBE_NAMESPACE,
    PRODUCTION,
  } = assertValidEnv(env);

  const isProductionCluster = Boolean(PRODUCTION);

  const application = isProductionCluster
    ? CI_PROJECT_NAME
    : CI_COMMIT_TAG !== undefined
    ? `${CI_COMMIT_TAG.replace(/\./g, "-")}-${CI_PROJECT_NAME}`
    : `${CI_ENVIRONMENT_SLUG}-${CI_PROJECT_NAME}`;

  return {
    namespace: {
      name: KUBE_NAMESPACE,
    },
    //
    domain: KUBE_INGRESS_BASE_DOMAIN,
    subdomain: isProductionCluster ? CI_PROJECT_NAME : application,
    //
    annotations: {
      "app.gitlab.com/app": CI_PROJECT_PATH_SLUG,
      "app.gitlab.com/env": CI_ENVIRONMENT_SLUG,
      "app.gitlab.com/env.name": CI_ENVIRONMENT_NAME,
    },
    labels: {
      application,
      owner: CI_PROJECT_NAME,
      team: CI_PROJECT_NAME,
    },
  };
};
