//

import {
  create as createApp,
  createFn,
} from "@socialgouv/kosko-charts/components/app";
import { merge } from "@socialgouv/kosko-charts/utils/merge";

import { DeploymentParams } from "../../utils/createDeployment";

// renovate: datasource=docker depName=redis versioning=6.0.5-alpine3.12
const REDIS_VERSION = "6.0.5-alpine3.12";

const redisDeploymentParams: Partial<Omit<
  DeploymentParams,
  "containerPort"
>> = {
  labels: {
    component: "redis",
  },
};

export const create: createFn = (
  name: string,
  { env, config = {}, deployment = {} }
) => {
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
        image: `redis:${REDIS_VERSION}`,
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
