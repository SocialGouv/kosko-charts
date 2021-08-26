//

import type {
  AppConfig,
  CreateFn,
} from "@socialgouv/kosko-charts/components/app";
import { create as createApp } from "@socialgouv/kosko-charts/components/app";
import { merge } from "@socialgouv/kosko-charts/utils/@kosko/env/merge";

const nginxConfig: Partial<AppConfig> = {
  container: {
    livenessProbe: {
      httpGet: {
        path: "/index.html",
        port: "http",
      },
      initialDelaySeconds: 30,
    },
    readinessProbe: {
      httpGet: {
        path: "/index.html",
        port: "http",
      },
    },

    resources: {
      limits: {
        cpu: "500m",
        memory: "128Mi",
      },
      requests: {
        cpu: "5m",
        memory: "32Mi",
      },
    },

    startupProbe: {
      httpGet: {
        path: "/index.html",
        port: "http",
      },
    },
  },
  containerPort: 80,
  labels: {
    component: "nginx",
  },
};

export const create: CreateFn = async (name, { env, config, deployment }) =>
  createApp(name, {
    config: merge(nginxConfig, config ?? {}),
    deployment,
    env,
  });
