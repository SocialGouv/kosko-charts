import { Deployment } from "kubernetes-models/apps/v1/Deployment";

import { matchLabelsFromParams } from "./matchLabels";
import { metadataFromParams } from "./metadata";
import { Params } from "./params";

export default (params: Params): Deployment => {
  const metadata = metadataFromParams(params);
  return new Deployment({
    metadata,
    spec: {
      replicas: 1,
      selector: {
        matchLabels: matchLabelsFromParams(params),
      },
      template: {
        metadata: {
          labels: metadata.labels,
        },
        spec: {
          containers: [
            {
              image: `${params.image.name}:${params.image.tag}`,
              livenessProbe: {
                // 11 x 5s + 30s = 30-1m
                // Kill the pod if not alive after 1 minute
                failureThreshold: 11,
                httpGet: {
                  path: "/healthz",
                  port: "http",
                },
                initialDelaySeconds: 5,
                periodSeconds: 5,
                timeoutSeconds: 5,
              },
              name: metadata.name,
              ports: [
                {
                  containerPort: params.containerPort,
                  name: "http",
                },
              ],
              readinessProbe: {
                // 5 x 5s + 5s = 5-30s
                // Mark pod as unhealthy after 30s
                failureThreshold: 5,
                httpGet: {
                  path: "/healthz",
                  port: "http",
                },
                initialDelaySeconds: 5,
                periodSeconds: 5,
                timeoutSeconds: 5,
              },
              resources: {
                limits: {
                  cpu: "500m",
                  memory: "128Mi",
                  ...(params.limits ?? {}),
                },
                requests: {
                  cpu: "5m",
                  memory: "16Mi",
                  ...(params.requests ?? {}),
                },
              },
            },
          ],
        },
      },
    },
  });
};
