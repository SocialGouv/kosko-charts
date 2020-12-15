import { assert } from "@sindresorhus/is";
import type { Deployment } from "kubernetes-models/apps/v1/Deployment";
import type { EnvFromSource } from "kubernetes-models/v1/EnvFromSource";

interface AddToContainerParams {
  deployment: Deployment;
  data: EnvFromSource[];
  containerIndex?: number;
}

export const addToEnvFrom = ({
  deployment,
  data,
  containerIndex = 0,
}: AddToContainerParams): void => {
  assert.object(deployment.spec);
  assert.object(deployment.spec.template.spec);
  const container = deployment.spec.template.spec.containers[containerIndex];
  container.envFrom = container.envFrom ?? [];
  container.envFrom.push(...data);
};