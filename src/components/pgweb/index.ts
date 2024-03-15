import type {
  AppConfig,
  CreateFn,
} from "@socialgouv/kosko-charts/components/app";
import { create as createApp } from "@socialgouv/kosko-charts/components/app";
import { merge } from "@socialgouv/kosko-charts/utils/@kosko/env/merge";

// renovate: datasource=docker depName=sosedoff/pgweb versioning=0.15.0
const PGWEB_VERSION = "0.15.0";

const pgwebConfig: Partial<AppConfig> = {
  container: {
    livenessProbe: {
      httpGet: {
        path: "/",
        port: "http",
      },
    },
    readinessProbe: {
      httpGet: {
        path: "/",
        port: "http",
      },
    },
    resources: {
      limits: {
        cpu: "500m",
        memory: "256Mi",
      },
      requests: {
        cpu: "100m",
        memory: "64Mi",
      },
    },
    startupProbe: {
      httpGet: {
        path: "/",
        port: "http",
      },
    },
  },
  containerPort: 8081,

  image: `sosedoff/pgweb:${PGWEB_VERSION}`,

  labels: {
    component: "pgweb",
  },
  withPostgres: true,
};
export const create: CreateFn = async (name, { env, config, deployment }) =>
  createApp(name, {
    config: merge(
      pgwebConfig,
      {
        subDomainPrefix: process.env.PRODUCTION ? `pgweb.` : "pgweb-",
      },
      config ?? {}
    ),
    deployment,
    env,
  });
