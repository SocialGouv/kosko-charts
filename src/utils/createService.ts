import { Service } from "kubernetes-models/v1/Service";

/** Parameters to create a [[Service]] with [[createService]] */
export interface CreateServiceParams {
  name: string;
  servicePort: number;
  containerPort: number;
  /** target selector (deployment labels) */
  selector: Record<string, string>;
  /** name of the port, default=http */
  portName?: string;
}

/**
 *
 * This function will return a [[Service]] with some defaults
 *
 * ```typescript
 * import { createService } from "@socialgouv/kosko-charts/utils"
 *
 * const service = createService({
 *   name: "app",
 *   servicePort: 80,
 *   containerPort: 3000,
 *   selector: 80,
 *   selector: {
 *     app: "my-target-app"
 *   }
 * });
 * ```
 * @category utils
 * @return {Service}
 */
export const createService = (params: CreateServiceParams): Service => {
  return new Service({
    metadata: {
      labels: {
        app: params.name,
      },
      name: params.name,
    },
    spec: {
      ports: [
        {
          name: params.portName ?? "http",
          port: params.servicePort,
          targetPort: params.containerPort,
        },
      ],
      selector: params.selector,
      type: "ClusterIP",
    },
  });
};

export default createService;
