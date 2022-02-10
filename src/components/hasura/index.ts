//

import type { DeploymentParams } from "@socialgouv/kosko-charts/utils";
import { merge } from "@socialgouv/kosko-charts/utils/@kosko/env/merge";

import type { AppConfig, CreateFn } from "../app";
import { create as createApp } from "../app";

const hasuraConfig: Partial<AppConfig> = {
  container: {
    resources: {
      limits: {
        cpu: "500m",
        memory: "512Mi",
      },
      requests: {
        cpu: "100m",
        memory: "64Mi",
      },
    },
    startupProbe: {
      failureThreshold: 20,

      initialDelaySeconds: 30,

      periodSeconds: 10,
      // wait 30 sec and up to 20*10sec to start
      successThreshold: 1,
      timeoutSeconds: 5,
    },
  },
  containerPort: 80,
  ingress: false,
  labels: {
    component: "hasura",
  },
  withPostgres: true,
};
const hasuraDeployment: Partial<Omit<DeploymentParams, "containerPort">> = {};
export const create: CreateFn = async (name, { env, config, deployment }) =>
  createApp(name, {
    config: merge(
      hasuraConfig,
      {
        image: "hasura/graphql-engine:latest",
        subDomainPrefix: process.env.PRODUCTION ? `hasura.` : "hasura-",
      },
      config ?? {}
    ),
    deployment: merge(hasuraDeployment, deployment ?? {}),
    env,
  });
