//

import type { DeploymentParams } from "@socialgouv/kosko-charts/utils";
import { merge } from "@socialgouv/kosko-charts/utils/@kosko/env/merge";

import type { AppConfig, CreateFn } from "../app";
import { create as createApp } from "../app";

// renovate: datasource=docker depName=metabase/metabase versioning=v0.42.4
const DOCKER_METABASE_TAG = "v0.42.4";

const metabaseConfig: Partial<AppConfig> = {
  containerPort: 3000,
  image: `metabase/metabase:${DOCKER_METABASE_TAG}`,
  subDomainPrefix: "metabase-",
};

const metabaseDeployment: Partial<Omit<DeploymentParams, "containerPort">> = {
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
        cpu: "1000m",
        memory: "2048Mi",
      },
      requests: {
        cpu: "500m",
        memory: "512Mi",
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
};

export const create: CreateFn = async (name, { env, config, deployment }) =>
  createApp(name, {
    config: merge(metabaseConfig, config ?? {}),
    deployment: merge(metabaseDeployment, deployment ?? {}),
    env,
  });
