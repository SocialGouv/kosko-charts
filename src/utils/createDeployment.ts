import type { IIoK8sApiCoreV1Container } from "kubernetes-models/_definitions/IoK8sApiCoreV1Container";
import type { IIoK8sApiCoreV1LocalObjectReference } from "kubernetes-models/_definitions/IoK8sApiCoreV1LocalObjectReference";
import { Deployment } from "kubernetes-models/apps/v1/Deployment";

import { merge } from "./merge";

export interface DeploymentParams {
  annotations?: Record<string, string>;
  container?: Omit<IIoK8sApiCoreV1Container, "name" | "image">;
  containerPort: number;
  image: string;
  labels?: Record<string, string>;
  name: string;
  imagePullSecrets?: IIoK8sApiCoreV1LocalObjectReference[];
}

export default (params: DeploymentParams): Deployment => {
  const tag = process.env.CI_COMMIT_TAG
    ? process.env.CI_COMMIT_TAG.slice(1)
    : process.env.CI_COMMIT_SHA;
  const image =
    params.image || `${process.env.CI_REGISTRY_IMAGE}/${params.name}:${tag}`;

  return new Deployment({
    metadata: {
      annotations: params.annotations,
      labels: merge(
        {
          app: params.name,
        },
        params.labels ?? {}
      ),
      name: params.name,
    },
    spec: {
      replicas: 1,
      selector: {
        matchLabels: {
          app: params.name,
        },
      },
      template: {
        metadata: {
          annotations: {},
          labels: merge(
            {
              app: params.name,
            },
            params.labels ?? {}
          ),
        },
        spec: {
          containers: [
            merge(
              {
                image,
                livenessProbe: {
                  // 6 x 5s + 30s = 30-1m
                  // Kill the pod if not alive after 1 minute
                  failureThreshold: 6,
                  httpGet: {
                    path: "/healthz",
                    port: "http",
                  },
                  initialDelaySeconds: 30,
                  periodSeconds: 5,
                  timeoutSeconds: 5,
                },
                name: params.name,
                ports: [
                  {
                    containerPort: params.containerPort,
                    name: "http",
                  },
                ],
                readinessProbe: {
                  // 15 x 1s = 0-15s
                  // Mark pod as unhealthy after 15s
                  failureThreshold: 15,
                  httpGet: {
                    path: "/healthz",
                    port: "http",
                  },
                  initialDelaySeconds: 0,
                  periodSeconds: 5,
                  successThreshold: 1,
                  timeoutSeconds: 1,
                },
                resources: {
                  limits: {
                    cpu: "500m",
                    memory: "128Mi",
                  },
                  requests: {
                    cpu: "5m",
                    memory: "16Mi",
                  },
                },
                startupProbe: {
                  // 12 x 5s = 0-1min
                  // Takes up to 1 minute to start up before it fails
                  failureThreshold: 12,
                  httpGet: {
                    path: "/healthz",
                    port: "http",
                  },
                  periodSeconds: 5,
                },
              },
              params.container ?? {}
            ),
          ],
          imagePullSecrets: params.imagePullSecrets,
        },
      },
    },
  });
};
