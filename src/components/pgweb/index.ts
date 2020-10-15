/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */
import { Environment } from "@kosko/env";
import { merge } from "@socialgouv/kosko-charts/utils/merge";
import { ok } from "assert";

import { AppConfig, create as createApp } from "../app";

type CreateResult = unknown[];

export const create = (
  // eslint-disable-next-line @typescript-eslint/ban-types
  { env, config = {} }: { env: Environment; config?: Partial<AppConfig> }
): CreateResult => {
  ok(process.env.CI_REGISTRY_IMAGE);
  ok(process.env.CI_ENVIRONMENT_URL);
  ok(process.env.CI_PROJECT_NAME);

  const manifests = createApp("pgweb", {
    config: merge(
      {
        image: "sosedoff/pgweb:latest",
        withPostgres: true,
        container: {
          livenessProbe: {
            httpGet: {
              path: "/",
              port: "http",
            },
            initialDelaySeconds: 5,
            timeoutSeconds: 3,
          },
          readinessProbe: {
            httpGet: {
              path: "/",
              port: "http",
            },
            initialDelaySeconds: 5,
            timeoutSeconds: 3,
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
        containerPort: 8081,

        subDomainPrefix: process.env.PRODUCTION ? `pgweb.` : "pgweb-",
      },
      config
    ),
    env,
  });

  //

  return manifests;
};
