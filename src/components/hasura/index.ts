/* eslint-disable simple-import-sort/sort */
import { Environment } from "@kosko/env";
import { merge } from "@socialgouv/kosko-charts/utils/merge";
import { ok } from "assert";

import { AppConfig, create as createApp } from "../app";
import { DeploymentParams } from "../../utils/createDeployment";

type CreateResult = unknown[];

export const create = (
  // eslint-disable-next-line @typescript-eslint/ban-types
  {
    env,
    config = {},
    deployment = {},
  }: {
    env: Environment;
    config?: Partial<AppConfig>;
    deployment?: Partial<DeploymentParams>;
  }
): CreateResult => {
  ok(process.env.CI_REGISTRY_IMAGE);
  ok(process.env.CI_ENVIRONMENT_URL);
  ok(process.env.CI_PROJECT_NAME);

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
        subDomainPrefix: process.env.PRODUCTION ? `hasura.` : "hasura-",

        withPostgres: true,
      },
      config
    ),
    deployment,
    env,
  });

  //

  return manifests;
};
