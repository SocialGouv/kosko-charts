//

import type {
  AppConfig,
  createFn,
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
};

const nginxDeployment = {
  labels: {
    component: "nginx",
  },
};

export const create: createFn = (name, { env, config, deployment }) => {
  // todo: atm we use "app" as a convention.
  const manifests = createApp(name, {
    config: merge(nginxConfig, config ?? {}),
    deployment: merge(nginxDeployment, deployment ?? {}),
    env,
  });

  //

  return manifests;
};
