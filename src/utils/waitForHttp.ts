import type { IIoK8sApiCoreV1Container } from "kubernetes-models/_definitions/IoK8sApiCoreV1Container";

export interface WaitForHttpParams {
  name: string;
  url: string;
}

export const waitForHttp = ({
  name,
  url,
}: WaitForHttpParams): IIoK8sApiCoreV1Container => {
  return {
    args: [url],
    image: `registry.gitlab.factory.social.gouv.fr/socialgouv/docker/wait-for-http:2.4.0`,
    imagePullPolicy: "Always",
    name: `wait-for-${name}`,
    resources: {
      limits: {
        cpu: "20m",
        memory: "32Mi",
      },
      requests: {
        cpu: "5m",
        memory: "16Mi",
      },
    },
  };
};
