/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */
import { IIoK8sApiCoreV1Container } from "kubernetes-models/_definitions/IoK8sApiCoreV1Container";

export interface WaitForPostgresParams {
  secretRefName: string;
}

export const waitForPostgres = ({
  secretRefName = "azure-pg-user",
}: WaitForPostgresParams): IIoK8sApiCoreV1Container => {
  return {
    name: "wait-for-postgres",
    image: `registry.gitlab.factory.social.gouv.fr/socialgouv/docker/wait-for-postgres:1.60.0`,
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
    envFrom: [
      {
        secretRef: {
          name: secretRefName,
        },
      },
    ],
    env: [
      {
        name: "WAIT_FOR_RETRIES",
        value: "24", // = (2min x 60s) / 5s
      },
    ],
  };
};
