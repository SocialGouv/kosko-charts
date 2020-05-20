import { Deployment } from "kubernetes-models/apps/v1/Deployment";

import { matchLabelsFromParams } from "./matchLabels";
import { metadataFromParams } from "./metadata";
import { Params } from "./params";

export default (params: Params): Deployment => {
  const metadata = metadataFromParams(params);
  return new Deployment({
    metadata,
    spec: {
      replicas: 1,
      selector: {
        matchLabels: matchLabelsFromParams(params),
      },
      template: {
        metadata: {
          labels: metadata.labels,
        },
        spec: {
          containers: [
            {
              image: `${params.image.name}:${params.image.tag}`,
              name: metadata.name,
              ports: [
                {
                  containerPort: params.containerPort,
                },
              ],
              resources: {
                limits: {
                  cpu: "50m",
                  memory: "32Mi",
                  ...(params.limits ?? {}),
                },
                requests: {
                  cpu: "5m",
                  memory: "16Mi",
                  ...(params.requests ?? {}),
                },
              },
            },
          ],
        },
      },
    },
  });
};
