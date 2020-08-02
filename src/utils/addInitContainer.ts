import { IIoK8sApiCoreV1Container } from "kubernetes-models/_definitions/IoK8sApiCoreV1Container";
import { Deployment } from "kubernetes-models/apps/v1/Deployment";

export const addInitContainer = (
  deployment: Deployment,
  initContainer: IIoK8sApiCoreV1Container
): Deployment => {
  if (deployment.spec) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!deployment.spec.template) {
      //@ts-expect-error
      deployment.spec.template = { spec: {} };
    }
    //@ts-expect-error
    deployment.spec.template.spec.initContainers = [initContainer];
  }

  return deployment;
};
