import { Ingress } from "kubernetes-models/extensions/v1beta1/Ingress";

interface IngressConfig {
  name: string;
  host: string;
  serviceName: string;
  servicePort: string;
  secretName?: string;
}

export default (params: IngressConfig): Ingress => {
  const host = params.host;
  return new Ingress({
    metadata: {
      annotations: {
        //      "certmanager.k8s.io/cluster-issuer": "letsencrypt-prod",
        "kubernetes.io/ingress.class": "nginx",
        //    "kubernetes.io/tls-acme": "true",
      },
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
