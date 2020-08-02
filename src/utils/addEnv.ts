import { assert } from "@sindresorhus/is";
import { Deployment } from "kubernetes-models/apps/v1/Deployment";
import { EnvVar } from "kubernetes-models/v1/EnvVar";

interface AddToContainerParams {
  deployment: Deployment;
  data: EnvVar;
  containerIndex?: number;
}

export const addEnv = ({
  deployment,
  data,
  containerIndex = 0,
}: AddToContainerParams): void => {
  assert.object(deployment.spec);
  assert.object(deployment.spec.template.spec);
  const container = deployment.spec.template.spec.containers[containerIndex];
  container.env = container.env ?? [];
  container.env.push(data);
};
