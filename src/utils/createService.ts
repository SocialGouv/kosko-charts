//

import { Service } from "kubernetes-models/v1/Service";

export interface Params {
  name: string;
  servicePort: number;
  containerPort: number;
  selector: { [key: string]: string };
  portName?: string;
}

export default (params: Params): Service => {
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
