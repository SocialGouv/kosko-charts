import { NetworkPolicy } from "kubernetes-models/networking.k8s.io/v1/NetworkPolicy";

/**  Basic netpol that allow :
/*      - communication inside namespace
/*      - communication from ingress-controller
/*      - communication from monitoring
*/

export const create = (namespace: string): NetworkPolicy =>
  new NetworkPolicy({
    metadata: { name: `netpol-${namespace}`, namespace },
    spec: {
      ingress: [
        {
          from: [
            {
              podSelector: {},
            },
          ],
        },
        {
          from: [
            {
              namespaceSelector: {
                matchLabels: {
                  "network-policy/source": "ingress-controller",
                },
              },
            },
          ],
        },
        {
          from: [
            {
              namespaceSelector: {
                matchLabels: {
                  "network-policy/source": "monitoring",
                },
              },
            },
          ],
        },
      ],
      podSelector: {},
      policyTypes: ["Ingress"],
    },
  });
