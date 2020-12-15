import type { IIoK8sApiCoreV1Container } from "kubernetes-models/_definitions/IoK8sApiCoreV1Container";

export interface WaitForPostgresParams {
  secretRefName: string;
}

export const waitForPostgres = ({
  secretRefName = "azure-pg-user",
}: WaitForPostgresParams): IIoK8sApiCoreV1Container => {
  return {
    env: [
      {
        name: "WAIT_FOR_RETRIES",
        value: "24", // = (2min x 60s) / 5s
      },
    ],
    envFrom: [
      {
        secretRef: {
          name: secretRefName,
        },
      },
    ],
    image: `registry.gitlab.factory.social.gouv.fr/socialgouv/docker/wait-for-postgres:2.0.0`,
    imagePullPolicy: "Always",
    name: "wait-for-postgres",
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