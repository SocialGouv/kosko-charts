import type { IIoK8sApiCoreV1Container } from "kubernetes-models/_definitions/IoK8sApiCoreV1Container";
import { Deployment } from "kubernetes-models/apps/v1/Deployment";
import type { ILocalObjectReference, IVolume } from "kubernetes-models/v1";

import { merge } from "./@kosko/env/merge";

/** Parameters to create a [[Deployment]] with [[createDeployment]] */
export interface DeploymentParams {
  /** kubernetes annotations */
  annotations?: Record<string, string>;
  /** container params */
  container?: Omit<IIoK8sApiCoreV1Container, "image" | "name">;
  /** default container port */
  containerPort: number;
  /** deployment docker image */
  image?: string;
  /** kubernetes labels */
  labels?: Record<string, string>;
  /** deployment name **/
  name: string;
  /** docker registry secrets */
  imagePullSecrets?: ILocalObjectReference[];
  /** volumes */
  volumes?: IVolume[];
  /** registry */
  registry: string;
  /** git tag */
  tag?: string;
  /** git sha */
  sha: string;
}

/**
 *
 * This function will return a [[Deployment]] with some defaults
 *
 * ```typescript
 * import { createDeployment } from "@socialgouv/kosko-charts/utils"
 *
 * const deployment = createDeployment({
 *   name: "app";
 *   image: "containous/whoami:latest"
 * });
 * ```
 * @category utils
 * @return {Deployment}
 */
export const createDeployment = (params: DeploymentParams): Deployment => {
  const tag = params.tag ? params.tag.slice(1) : params.sha;
  const image = params.image ?? `${params.registry}/${params.name}:${tag}`;

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
          volumes: params.volumes,
        },
      },
    },
  });
};

export default createDeployment;
