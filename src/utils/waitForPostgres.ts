/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */
import { IIoK8sApiCoreV1Container } from "kubernetes-models/_definitions/IoK8sApiCoreV1Container";

interface WaitForPostgresParams {
  secretRefName: string;
}

const script = `
retry=120; # 5s * (12 * 10) = 10min
while ! pg_isready -d \${DATABASE_URL} > /dev/null 2> /dev/null && [[ $(( retry-- )) -gt 0 ]];
  do
    echo "Waiting for Postgres to go Green ($(( retry )))" ; sleep 5s ; done ;
echo Ready;
`;

export const waitForPostgres = ({
  secretRefName = "azure-pg-user",
}: WaitForPostgresParams): IIoK8sApiCoreV1Container => {
  return {
    name: "wait-for-postgres",
    image: `postgres:10`,
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
    command: ["sh", "-c", script],
  };
};
