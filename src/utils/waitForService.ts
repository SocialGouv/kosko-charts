/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */
import type { IIoK8sApiCoreV1Container } from "kubernetes-models/_definitions/IoK8sApiCoreV1Container";

/**
 * This creates a [[Container]] that runs until `nslookup` resolve for the given service in the current kube namespace
 *
 * ```typescript
 * import { waitForService } from "@socialgouv/kosko-charts/utils"
 *
 * const container = waitForService({
 *   name: "hasura"
 * });
 * ```
 * @category utils
 * @return {IIoK8sApiCoreV1Container}
 */
export const waitForService = (name: string): IIoK8sApiCoreV1Container => {
  return {
    name: `wait-for-${name}`,
    image: `bash:4`,
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
    command: [
      "sh",
      "-c",
      `until nslookup ${name}.$(cat /var/run/secrets/kubernetes.io/serviceaccount/namespace).svc.cluster.local; do echo en attente de ${name}; sleep 2; done`,
    ],
  };
};
