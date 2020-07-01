import { Deployment } from "kubernetes-models/apps/v1/Deployment";
import { EnvFromSource } from "kubernetes-models/v1/EnvFromSource";

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
  const container = deployment.spec!.template.spec!.containers[containerIndex]; // eslint-disable-line @typescript-eslint/no-non-null-assertion
  if (!container.envFrom) {
    container.envFrom = [];
  }
  container.envFrom.push(...data);
};
