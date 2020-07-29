import { Environment } from "@kosko/env";
import { merge } from "@socialgouv/kosko-charts/utils/merge";
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
    config: merge(
      {
        container: {
          livenessProbe: {
            initialDelaySeconds: 60,
            periodSeconds: 20,
          },
          readinessProbe: {
            initialDelaySeconds: 60,
            periodSeconds: 20,
          },
          resources: {
            limits: {
              cpu: "500m",
              memory: "256Mi",
            },
            requests: {
              cpu: "100m",
              memory: "64Mi",
            },
          },
        },
        containerPort: 80,

        subdomain: `hasura-${process.env.CI_PROJECT_NAME}`,
      },
      config
    ),
    env,
  });

  // DEV: add secret to access DB
  const deployment = manifests.find(
    (manifest): manifest is Deployment => manifest.kind === "Deployment"
  );
  ok(deployment);

  addPostgresUserSecret(deployment);
  addWaitForPostgres(deployment);

  //

  return manifests;
};
