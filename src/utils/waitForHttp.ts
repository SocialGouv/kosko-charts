import { IIoK8sApiCoreV1Container } from "kubernetes-models/_definitions/IoK8sApiCoreV1Container";

export interface WaitForHttpParams {
  name: string;
  url: string;
}

export const waitForHttp = ({
  name,
  url,
}: WaitForHttpParams): IIoK8sApiCoreV1Container => {
  return {
    name: `wait-for-${name}`,
    image: `registry.gitlab.factory.social.gouv.fr/socialgouv/docker/wait-for-http:2.4.0`,
    imagePullPolicy: "Always",
    resources: {
      requests: {
        cpu: "5m",
        memory: "16Mi",
      },
      limits: {
        cpu: "20m",
        memory: "32Mi",
      },
    },
    args: [url],
  };
};
