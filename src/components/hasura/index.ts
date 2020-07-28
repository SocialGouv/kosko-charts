import { Environment } from "@kosko/env";
import { ok } from "assert";
import { Deployment } from "kubernetes-models/apps/v1/Deployment";

import { addPostgresUserSecret } from "../../utils/addPostgresUserSecret";
import { addWaitForPostgres } from "../../utils/addWaitForPostgres";
import { create as createApp } from "../app";

type CreateResult = unknown[];

export const create = (
  //name: string,
  // eslint-disable-next-line @typescript-eslint/ban-types
  { env, config }: { env: Environment; config: object }
): CreateResult => {
  ok(process.env.CI_REGISTRY_IMAGE);
  ok(process.env.CI_ENVIRONMENT_URL);
  ok(process.env.CI_PROJECT_NAME);

  // todo: extract to @socialgouv/kosko-charts/components/hasura
  const manifests = createApp("hasura", {
    config: {
      containerPort: 80,

      limits: {
        cpu: "500m",
        memory: "256Mi",
      },

      livenessProbe: {
        httpGet: {
          path: "/healthz",
          port: "http",
        },
        initialDelaySeconds: 60,
        periodSeconds: 20,
      },

      readinessProbe: {
        httpGet: {
          path: "/healthz",
          port: "http",
        },
        initialDelaySeconds: 60,
        periodSeconds: 20,
      },

      requests: {
        cpu: "100m",
        memory: "64Mi",
      },
      //ingress: false,
      subdomain: `hasura-${process.env.CI_PROJECT_NAME}`,
      ...config,
    },
    env,
  });

  // DEV: add secret to access DB
  const deployment = manifests.find(
    //@ts-expect-error
    (manifest) => manifest.kind === "Deployment"
  ) as Deployment;

  addPostgresUserSecret(deployment);

  // todo: doesnt work ATM, we need to check if user+db are ready
  // addWaitForPostgres(deployment);

  //
  return manifests;
};
