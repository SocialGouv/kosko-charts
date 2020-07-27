import { IIoK8sApiCoreV1Probe } from "kubernetes-models/_definitions/IoK8sApiCoreV1Probe";
import { IoK8sApiCoreV1ResourceRequirements } from "kubernetes-models/_definitions/IoK8sApiCoreV1ResourceRequirements";
//import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "kubernetes-models/_definitions/IoK8sApimachineryPkgApisMetaV1ObjectMeta";
import { Deployment } from "kubernetes-models/apps/v1/Deployment";

interface DeploymentParams {
  name: string;
  containerPort: number;
  //metadata: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
  image: string;
  // { name: string | undefined; tag: string | undefined };
  resources: IoK8sApiCoreV1ResourceRequirements | null;
  livenessProbe: IIoK8sApiCoreV1Probe | null;
  readinessProbe: IIoK8sApiCoreV1Probe | null;
}

export default (params: DeploymentParams): Deployment => {
  //const image = params.image.name || process.env.CI_REGISTRY_IMAGE;
  //const tag = params.image.tag || process.env.CI_COMMIT_SHA;
  const tag = process.env.CI_COMMIT_TAG
    ? process.env.CI_COMMIT_TAG.slice(1)
    : process.env.CI_COMMIT_SHA;
  const image =
    params.image || `${process.env.CI_REGISTRY_IMAGE}/${params.name}:${tag}`;

  return new Deployment({
    metadata: {
      annotations: {},
      labels: {
        app: params.name,
      },
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
          labels: {
            app: params.name,
          },
        },
        spec: {
          containers: [
            {
              image,
              livenessProbe: params.livenessProbe ?? {
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
              readinessProbe: params.readinessProbe ?? {
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
                  //   ...(params.limits ?? {}),
                },
                requests: {
                  cpu: "5m",
                  memory: "16Mi",
                  //  ...(params.requests ?? {}),
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
          ],
        },
      },
    },
  });
};
