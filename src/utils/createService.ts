import { Service } from "kubernetes-models/v1/Service";

//import { matchLabelsFromParams } from "./matchLabels";
//import { metadataFromParams } from "./metadata";
//import { Params } from "./params";

interface Params {
  name: string;
  servicePort: number;
  containerPort: number;
  selector: { [key: string]: string };
}

export default (params: Params): Service => {
  //  const metadata = metadataFromParams(params);

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
          port: params.servicePort,
          targetPort: params.containerPort,
        },
      ],
      selector: params.selector,
      type: "ClusterIP",
    },
  });
};
