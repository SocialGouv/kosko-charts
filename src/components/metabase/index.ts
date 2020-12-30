import type { Environment } from "@kosko/env";
import { merge } from "@socialgouv/kosko-charts/utils/@kosko/env/merge";

import type { DeploymentParams } from "../../utils/createDeployment";
import type { AppConfig } from "../app";
import { create as createApp } from "../app";

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
): CreateResult =>
  createApp("metabase", {
    config: merge(
      {
        containerPort: 3000,
        image: "metabase/metabase:v0.37.4",
        subDomainPrefix: "metabase-",
      },
      config
    ),
    deployment: merge(
      {
        container: {
          livenessProbe: {
            httpGet: {
              path: "/api/health",
              port: "http",
            },
          },
          readinessProbe: {
            httpGet: {
              path: "/api/health",
              port: "http",
            },
          },
          resources: {
            limits: {
              cpu: "500m",
              memory: "1024Mi",
            },
            requests: {
              cpu: "100m",
              memory: "256Mi",
            },
          },
          startupProbe: {
            httpGet: {
              path: "/api/health",
              port: "http",
            },
            initialDelaySeconds: 240, // initial metabase migration can be slow and shouldnt be interrupted
            periodSeconds: 10,
            successThreshold: 1,
            timeoutSeconds: 10,
          },
        },
      },
      deployment
    ),
    env,
  });
