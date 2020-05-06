//

import { Service } from "kubernetes-models/v1/Service";
import { Ingress } from "kubernetes-models/extensions/v1beta1/Ingress";
import { Deployment } from "kubernetes-models/apps/v1/Deployment";
import env from "@kosko/env";

const params = env.component("app");
const name = params.name || "app";

export const matchLabels = { app: name };
export const metadata = {
  name: name,
  labels: { ...matchLabels, ...params.labels },
  namespace: params.namespaceName,
};

//

export const host = `${params.subdomain}.${params.domain}`;

//

export const deployment = new Deployment({
  metadata,
  spec: {
    replicas: 1,
    selector: {
      matchLabels,
    },
    template: {
      metadata: {
        labels: metadata.labels,
      },
      spec: {
        containers: [
          {
            image: `${params.imageName}:${params.imageTag}`,
            name: metadata.name,
            ports: [
              {
                containerPort: params.containerPort,
              },
            ],
            resources: {
              limits: {
                cpu: "50m",
                memory: "32Mi",
                ...params.limits,
              },
              requests: {
                cpu: "5m",
                memory: "16Mi",
                ...params.requests,
              },
            },
          },
        ],
      },
    },
  },
});

export const ingress = new Ingress({
  metadata: {
    ...metadata,
    annotations: {
      "appgw.ingress.kubernetes.io/ssl-redirect": "true",
      "kubernetes.io/ingress.class": "azure/application-gateway",
    },
  },
  spec: {
    rules: [
      {
        host,
        http: {
          paths: [
            {
              path: "/",
              backend: {
                serviceName: metadata.name,
                servicePort: params.servicePort,
              },
            },
          ],
        },
      },
    ],
    tls: [
      {
        hosts: [host],
        secretName: "wildcard-crt",
      },
    ],
  },
});

export const service = new Service({
  metadata,
  spec: {
    selector: matchLabels,
    type: "ClusterIP",
    ports: [
      {
        port: params.servicePort,
        targetPort: params.containerPort,
      },
    ],
  },
});

export default [deployment, ingress, service];
