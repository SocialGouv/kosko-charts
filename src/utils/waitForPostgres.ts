import type { IIoK8sApiCoreV1Container } from "kubernetes-models/_definitions/IoK8sApiCoreV1Container";

// renovate: datasource=docker depName=registry.gitlab.factory.social.gouv.fr/socialgouv/docker/wait-for-postgres versioning=2.6.1
const SOCIALGOUV_DOCKER_WAIT_FOR_PG = "2.6.1";

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
    image: `registry.gitlab.factory.social.gouv.fr/socialgouv/docker/wait-for-postgres:${SOCIALGOUV_DOCKER_WAIT_FOR_PG}`,
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
