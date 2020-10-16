import {
  AppConfig,
  create as createApp,
  createFn,
} from "@socialgouv/kosko-charts/components/app";
import { merge } from "@socialgouv/kosko-charts/utils/merge";

const pgwebConfig: Partial<AppConfig> = {
  container: {
    livenessProbe: {
      httpGet: {
        path: "/",
        port: "http",
      },
      initialDelaySeconds: 5,
      timeoutSeconds: 3,
    },
    readinessProbe: {
      httpGet: {
        path: "/",
        port: "http",
      },
      initialDelaySeconds: 5,
      timeoutSeconds: 3,
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
  },
  containerPort: 8081,
  image: "sosedoff/pgweb:latest",
  subDomainPrefix: process.env.PRODUCTION ? `pgweb.` : "pgweb-",

  withPostgres: true,
};

const pgwebDeployment = {
  labels: {
    component: "pgweb",
  },
};

export const create: createFn = (name, { env, config, deployment }) => {
  const manifests = createApp(name, {
    config: merge(
      pgwebConfig,
      {
        subDomainPrefix: process.env.PRODUCTION ? `pgweb.` : "pgweb-",
      },
      config ?? {}
    ),
    deployment: merge(pgwebDeployment, deployment ?? {}),
    env,
  });

  //

  return manifests;
};
