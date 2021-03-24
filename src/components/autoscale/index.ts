import { merge } from "@socialgouv/kosko-charts/utils/@kosko/env/merge";
import { ok } from "assert";
import type { IIoK8sApiAutoscalingV2beta2HorizontalPodAutoscalerSpec } from "kubernetes-models/_definitions/IoK8sApiAutoscalingV2beta2HorizontalPodAutoscalerSpec";
import type { Deployment } from "kubernetes-models/apps/v1/Deployment";
import { HorizontalPodAutoscaler } from "kubernetes-models/autoscaling/v2beta2/HorizontalPodAutoscaler";

type TargetType = Deployment;
export const createAutoscale = (
  target: TargetType,
  spec?: Partial<IIoK8sApiAutoscalingV2beta2HorizontalPodAutoscalerSpec>
): HorizontalPodAutoscaler => {
  ok(target.metadata?.name, "Missing metadata.name on target");
  ok(target.metadata.namespace, "Missing metadata.namespace on target");

  const defaultSpec: IIoK8sApiAutoscalingV2beta2HorizontalPodAutoscalerSpec = {
    maxReplicas: 10,

    metrics: [
      {
        resource: {
          name: "cpu",
          target: {
            averageUtilization: 100,
            type: "Utilization",
          },
        },
        type: "Resource",
      },
      {
        resource: {
          name: "memory",
          target: {
            averageUtilization: 100,
            type: "Utilization",
          },
        },
        type: "Resource",
      },
    ],

    minReplicas: 1,

    scaleTargetRef: {
      apiVersion: target.apiVersion,
      kind: target.kind,
      name: target.metadata.name,
    },
  };

  const hpa = new HorizontalPodAutoscaler({
    metadata: {
      name: target.metadata.name,
      namespace: target.metadata.namespace,
    },
    spec: merge(defaultSpec, spec ?? {}),
  });

  return hpa;
};
