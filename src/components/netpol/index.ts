import environments from "@socialgouv/kosko-charts/environments";
import { NetworkPolicy } from "kubernetes-models/networking.k8s.io/v1/NetworkPolicy";

/**  Basic netpol that allow :
/*      - communication inside namespace
/*      - communication from ingress-controller
/*      - communication from monitoring
*/

export const create = (namespace?: string): NetworkPolicy => {
  const ciEnv = environments(process.env);
  const ns = namespace || ciEnv.metadata.namespace.name;
  return new NetworkPolicy({
    metadata: { name: `netpol-${ns}`, namespace: ns },
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
};
