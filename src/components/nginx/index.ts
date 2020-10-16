/* eslint-disable sort-keys-fix/sort-keys-fix */
import { Environment } from "@kosko/env";
import {
  AppConfig,
  create as createApp,
} from "@socialgouv/kosko-charts/components/app";
import { DeploymentParams } from "@socialgouv/kosko-charts/utils/createDeployment";
import { merge } from "@socialgouv/kosko-charts/utils/merge";

type CreateResult = unknown[];

const nginxConfig: Partial<AppConfig> = {
  container: {
    livenessProbe: {
      httpGet: {
        port: "http",
        path: "/index.html",
      },
      initialDelaySeconds: 30,
    },
    readinessProbe: {
      httpGet: {
        port: "http",
        path: "/index.html",
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
        port: "http",
        path: "/index.html",
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

export const create = (
  name: string,
  {
    env,
    config = {},
    deployment = {},
  }: {
    env: Environment;
    config?: Partial<AppConfig>;
    deployment?: Partial<Omit<DeploymentParams, "containerPort">>;
  }
): CreateResult => {
  // todo: atm we use "app" as a convention.
  const manifests = createApp(name, {
    config: merge(nginxConfig, config),
    env,
    deployment: merge(nginxDeployment, deployment),
  });

  //

  return manifests;
};
