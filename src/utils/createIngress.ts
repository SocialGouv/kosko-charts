import { Ingress } from "kubernetes-models/extensions/v1beta1/Ingress";

export interface IngressConfig {
  name: string;
  host: string;
  serviceName: string;
  servicePort: number;
  secretName?: string;
}

export default (params: IngressConfig): Ingress => {
  const host = params.host;
  const annotations: Record<string, string> = {
    "kubernetes.io/ingress.class": "nginx",
  };
  if (process.env.PRODUCTION) {
    annotations["certmanager.k8s.io/cluster-issuer"] = "letsencrypt-prod";
    annotations["kubernetes.io/tls-acme"] = "true";
  }
  return new Ingress({
    metadata: {
      annotations,
      labels: {
        app: params.name,
      },
      name: params.name,
    },
    spec: {
      rules: [
        {
          host,
          http: {
            paths: [
              {
                backend: {
                  serviceName: params.serviceName,
                  servicePort: params.servicePort,
                },
                path: "/",
              },
            ],
          },
        },
      ],
      tls: [
        {
          hosts: [host],
          secretName:
            params.secretName ??
            (process.env.PRODUCTION ? `${params.name}-crt` : "wildcard-crt"),
        },
      ],
    },
  });
};
