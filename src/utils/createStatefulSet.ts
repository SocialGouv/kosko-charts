import type { IIoK8sApiCoreV1Container } from "kubernetes-models/_definitions/IoK8sApiCoreV1Container";
import type { IIoK8sApiCoreV1LocalObjectReference } from "kubernetes-models/_definitions/IoK8sApiCoreV1LocalObjectReference";
import { IoK8sApiCoreV1PersistentVolumeClaim } from "kubernetes-models/_definitions/IoK8sApiCoreV1PersistentVolumeClaim";
import { Deployment } from "kubernetes-models/apps/v1/Deployment";
import { StatefulSet } from "kubernetes-models/apps/v1/StatefulSet";

import { merge } from "./@kosko/env/merge";

/** Parameters to create a [[Deployment]] with [[createDeployment]] */
export interface StatefulSetParams {
  /** kubernetes annotations */
  annotations?: Record<string, string>;
  /** container params */
  container?: Omit<IIoK8sApiCoreV1Container, "image" | "name">;
  /** default container port */
  containerPort: number;
  /** deployment docker image */
  image: string;
  /** kubernetes labels */
  labels?: Record<string, string>;
  /** deployment name **/
  name: string;
  /** docker registry secrets */
  imagePullSecrets?: IIoK8sApiCoreV1LocalObjectReference[];
  /** volumes to attach to the deployment */
  volumes?: [];
}

/**
 *
 * This function will return a [[Deployment]] with some defaults
 *
 * ```typescript
 * import { createStatefulSet } from "@socialgouv/kosko-charts/utils"
 *
 * const deployment = createStatefulSet({
 *   name: "app",
 *   image: "containous/whoami:latest",
 *   volumes: [{
 *     name: "data",
 *     size: "10Gi"
 *     mountPath: "/mnt/data",
 *   }]
 * }, true);
 * ```
 * @category utils
 * @return {StatefulSet}
 */
export const createStatefulSet = (
  params: StatefulSetParams,
  stateful = false
): Deployment | StatefulSet => {
  const tag = process.env.CI_COMMIT_TAG
    ? process.env.CI_COMMIT_TAG.slice(1)
    : process.env.CI_COMMIT_SHA;

  const image =
    params.image || `${process.env.CI_REGISTRY_IMAGE}/${params.name}:${tag}`;

  const volumes = params.volumes?.map(({ name }) =>
    stateful
      ? {
          name,
          persistentVolumeClaim: { claimName: `${params.name}-${name}` },
        }
      : { name }
  );

  const selector = { matchLabels: { app: params.name } };

  const container = {
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
  };

  const volumeMounts = params.volumes?.map(({ name, mountPath }) => ({
    mountPath,
    name,
  }));

  const containers = [
    merge(
      params.volumes
        ? {
            ...container,
            ...{ volumeMounts },
          }
        : container,
      params.container ?? {}
    ),
  ];

  const template = {
    metadata: {
      annotations: {},
      labels: merge(
        {
          app: params.name,
        },
        params.labels ?? {}
      ),
    },
    spec:
      volumes && !stateful
        ? {
            containers,
            imagePullSecrets: params.imagePullSecrets,
            volumes,
          }
        : {
            containers,
            imagePullSecrets: params.imagePullSecrets,
          },
  };

  const metadata = {
    annotations: params.annotations,
    labels: merge(
      {
        app: params.name,
      },
      params.labels ?? {}
    ),
    name: params.name,
  };

  if (stateful) {
    const volumeClaimTemplates = params.volumes?.map(({ name, size }) => ({
      apiVersion: IoK8sApiCoreV1PersistentVolumeClaim.apiVersion,
      kind: IoK8sApiCoreV1PersistentVolumeClaim.kind,
      metadata: { name },
      spec: {
        accessModes: ["ReadWriteMany"],
        resources: { requests: { storage: size } },
        storageClassName: name,
      },
    }));

    const spec = {
      replicas: 1,
      selector,
      serviceName: params.name,
      template,
      volumeClaimTemplates,
    };

    const config = { metadata, spec };
    return new StatefulSet(config);
  } else {
    const spec = { replicas: 1, selector, template };
    const config = { metadata, spec };
    return new Deployment(config);
  }
};

export default createStatefulSet;
