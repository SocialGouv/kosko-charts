import { Environment } from "@kosko/env";
import { merge } from "@socialgouv/kosko-charts/utils/merge";
import { ok } from "assert";

import { AppConfig, create as createApp } from "../app";

type CreateResult = unknown[];

export const create = ({
  env,
  config = {},
}: {
  env: Environment;
  config?: Partial<AppConfig>;
}): CreateResult => {
  ok(process.env.CI_REGISTRY_IMAGE);
  ok(process.env.CI_ENVIRONMENT_URL);
  ok(process.env.CI_PROJECT_NAME);

  const manifests = createApp("app", {
    config: merge(
      {
        container: {
          livenessProbe: {
            httpGet: {
              path: "/index.html",
            },
            initialDelaySeconds: 10,
          },
          readinessProbe: {
            httpGet: {
              path: "/index.html",
            },
          },
          startupProbe: {
            httpGet: {
              path: "/index.html",
            },
          },
          // eslint-disable-next-line sort-keys-fix/sort-keys-fix
          // eslint-disable-next-line sort-keys
          resources: {
            limits: {
              cpu: "300m",
              memory: "128Mi",
            },
            requests: {
              cpu: "50m",
              memory: "64Mi",
            },
          },
        },
        containerPort: 80,
      },
      config
    ),
    env,
  });

  //

  return manifests;
};
