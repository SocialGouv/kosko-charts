/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */
import { IIoK8sApiCoreV1Container } from "kubernetes-models/_definitions/IoK8sApiCoreV1Container";

interface WaitForPostgresParams {
  secretRefName: string;
}

const script = `
retry=5; # 5s * (12 * 10) = 10min
while ! psql -c "SELECT VERSION();" > /dev/null 2> /dev/null && [ $retry -gt 0 ];
  do
    echo "Waiting for Postgres to go Green ($(( retry )))" ;
    retry=$(( $retry-1 ));
    sleep 1s ;
  done ;
if [ $retry -eq 0 ]; then
    echo "Not Ready";
    exit 2
fi
echo "Ready";
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
