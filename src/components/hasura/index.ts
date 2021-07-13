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
  },
  containerPort: 80,
  ingress: false,
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
