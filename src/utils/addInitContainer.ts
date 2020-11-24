import type { IIoK8sApiCoreV1Container } from "kubernetes-models/_definitions/IoK8sApiCoreV1Container";
import type { Deployment } from "kubernetes-models/apps/v1/Deployment";

export const addInitContainer = (
  deployment: Deployment,
  initContainer: IIoK8sApiCoreV1Container
): Deployment => {
  if (!deployment.spec?.template) {
    return deployment;
  }

  deployment.spec.template.spec = deployment.spec.template.spec ?? {
    containers: [],
    initContainers: [],
  };
  const containers = deployment.spec.template.spec.initContainers ?? [];
  containers.push(initContainer);
  deployment.spec.template.spec.initContainers = containers;

  return deployment;
};
