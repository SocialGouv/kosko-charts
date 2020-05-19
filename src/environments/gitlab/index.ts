//

import { fold } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";
import * as t from "io-ts";
import { NonEmptyString } from "io-ts-types/lib/NonEmptyString";
import { failure } from "io-ts/lib/PathReporter";

import { GlobalEnvironment } from "@socialgouv/kosko-charts/types";

const GitlabProcessEnv = t.type(
  {
    PRODUCTION: t.union([t.string, t.undefined]),
    CI_ENVIRONMENT_NAME: NonEmptyString,
    CI_ENVIRONMENT_SLUG: NonEmptyString,
    CI_PROJECT_NAME: NonEmptyString,
    CI_PROJECT_PATH_SLUG: NonEmptyString,
    KUBE_INGRESS_BASE_DOMAIN: NonEmptyString,
    KUBE_NAMESPACE: NonEmptyString,
  },
  "process.env"
);

type GitlabProcessEnv = t.TypeOf<typeof GitlabProcessEnv>;

function assertValidEnv(env: typeof process.env): GitlabProcessEnv {
  /* eslint-disable @typescript-eslint/unbound-method */
  return pipe(
    env,
    GitlabProcessEnv.decode,
    fold(
      (errors) => {
        throw new Error(
          [
            "Invalid config provided:",
            "- " + failure(errors).join("\n- ").replace(/\//g, "."),
          ].join("\n")
        );
      },
      (env) => ({
        PRODUCTION: env.PRODUCTION,
        CI_ENVIRONMENT_NAME: env.CI_ENVIRONMENT_NAME,
        CI_ENVIRONMENT_SLUG: env.CI_ENVIRONMENT_SLUG,
        CI_PROJECT_NAME: env.CI_PROJECT_NAME,
        CI_PROJECT_PATH_SLUG: env.CI_PROJECT_PATH_SLUG,
        KUBE_INGRESS_BASE_DOMAIN: env.KUBE_INGRESS_BASE_DOMAIN,
        KUBE_NAMESPACE: env.KUBE_NAMESPACE,
      })
    )
  );
}

export default (env = process.env): GlobalEnvironment => {
  const {
    PRODUCTION,
    CI_ENVIRONMENT_NAME,
    CI_ENVIRONMENT_SLUG,
    CI_PROJECT_NAME,
    CI_PROJECT_PATH_SLUG,
    KUBE_INGRESS_BASE_DOMAIN,
    KUBE_NAMESPACE,
  } = assertValidEnv(env);

  const isProductionCluster = Boolean(PRODUCTION);
  const application = isProductionCluster
    ? CI_PROJECT_NAME
    : `${CI_ENVIRONMENT_SLUG as string}-${CI_PROJECT_NAME as string}`;

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
