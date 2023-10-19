//

import type {
  AppConfig,
  CreateFn,
} from "@socialgouv/kosko-charts/components/app";
import { create as createApp } from "@socialgouv/kosko-charts/components/app";
import { merge } from "@socialgouv/kosko-charts/utils/@kosko/env/merge";

// renovate: datasource=docker depName=redis versioning=6.2.14
const REDIS_VERSION = "6.2.14";

const redisConfig: Partial<AppConfig> = {
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
  labels: {
    component: "redis",
  },
};

export const create: CreateFn = async (name, { env, config, deployment }) =>
  createApp(name, {
    config: merge(
      redisConfig,
      {
        subDomainPrefix: process.env.PRODUCTION ? `redis.` : "redis-",
      },
      config ?? {}
    ),
    deployment,
    env,
  });
