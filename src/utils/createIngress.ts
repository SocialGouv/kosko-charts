import { Ingress } from "kubernetes-models/extensions/v1beta1/Ingress";

export interface IngressConfig {
  name: string;
  hosts: string[];
  serviceName?: string;
  servicePort?: number;
  secretName?: string;
  annotations?: Record<string, unknown>;
}

const getHostService = ({ serviceName = "app", servicePort = 3000 }) => ({
  http: {
    paths: [
      {
        backend: {
          serviceName,
          servicePort,
        },
        path: "/",
      },
    ],
  },
});

export default (params: IngressConfig): Ingress => {
  const hosts = params.hosts;
  const annotations: Record<string, string> = {
    "kubernetes.io/ingress.class": "nginx",
    ...(params.annotations ?? {}),
  };
  if (process.env.PRODUCTION) {
    annotations["certmanager.k8s.io/cluster-issuer"] = "letsencrypt-prod";
    annotations["kubernetes.io/tls-acme"] = "true";
  }
  const isRedirectionIngress = !!annotations[
    "nginx.ingress.kubernetes.io/permanent-redirect"
  ];

  const ingressDefinition = {
    metadata: {
      annotations,
      labels: {
        app: params.name,
      },
      name: params.name,
    },
    spec: {
      rules: hosts.map((host) => ({
        host,
        // when redirecting, we dont need to map the service
        ...(isRedirectionIngress
          ? {}
          : getHostService({
              serviceName: params.serviceName,
              servicePort: params.servicePort,
            })),
      })),
      tls: [
        {
          hosts: hosts,
          secretName:
            params.secretName ??
            (process.env.PRODUCTION ? `${params.name}-crt` : "wildcard-crt"),
        },
      ],
    },
  };

  return new Ingress(ingressDefinition);
};
