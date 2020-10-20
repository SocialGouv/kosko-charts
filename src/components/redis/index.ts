//

import { Environment } from "@kosko/env";
import {
  AppConfig,
  create as createApp,
} from "@socialgouv/kosko-charts/components/app";
import { merge } from "@socialgouv/kosko-charts/utils/merge";

import { DeploymentParams } from "../../utils/createDeployment";

type CreateResult = unknown[];

const redisDeploymentParams: Partial<Omit<
  DeploymentParams,
  "containerPort"
>> = {
  labels: {
    component: "redis",
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
  const manifests = createApp(name, {
    config: merge(
      {
        container: {
          livenessProbe: {
            exec: {
              command: ["sh", "-c", "redis-cli ping"],
            },
            httpGet: undefined,
          },
          readinessProbe: {
            exec: {
              command: ["sh", "-c", "redis-cli ping"],
            },
            httpGet: undefined,
          },
          startupProbe: {
            exec: {
              command: ["sh", "-c", "redis-cli ping"],
            },
            httpGet: undefined,
          },
        },
        containerPort: 6379,
        image: "redis:6.0.5-alpine3.12",
        ingress: false,
        subDomainPrefix: process.env.PRODUCTION ? `redis.` : "redis-",
      },
      config
    ),
    deployment: merge(redisDeploymentParams, deployment),
    env,
  });

  //

  return manifests;
};
