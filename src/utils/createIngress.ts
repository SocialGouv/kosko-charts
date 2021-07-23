import type { IIngressRule } from "kubernetes-models/_definitions/IoK8sApiNetworkingV1IngressRule";
import { Ingress } from "kubernetes-models/networking.k8s.io/v1/Ingress";

/** Parameters to create an [[Ingress]] with [[createDeployment]] */
export interface IngressConfig {
  /** ingress name */
  name: string;
  /** hosts to listen to */
  hosts: string[];
  /** name of the target service */
  serviceName?: string;
  /** the name of the port of the target service */
  servicePortName?: string;
  /** name of the secret for TLS certificate */
  secretName?: string;
  /** kubernetes annotations */
  annotations?: Record<string, unknown>;
  /** is a production ingress */
  isProduction: boolean;
}

const getHostService = ({
  serviceName = "www",
  servicePortName = "http",
}): IIngressRule => ({
  http: {
    paths: [
      {
        backend: {
          service: {
            name: serviceName,
            port: {
              name: servicePortName,
            },
          },
        },
        path: "/",
        pathType: "Prefix",
      },
    ],
  },
});

/**
 *
 * This function will return an [[Ingress]] with some defaults
 *
 * The ingress will listen on given `hosts` and redirect to given service
 *
 * If the ingress has the `nginx.ingress.kubernetes.io/permanent-redirect` annotation then the `hosts` will be used only for SSL certificate
 *
 * ```typescript
 * import { createIngress } from "@socialgouv/kosko-charts/utils"
 *
 * const ingress = createIngress({
 *   name: "app-ingress",
 *   hosts: ["host1.pouet.fr", "host2.pouet.fr"],
 *   serviceName: "www",
 *   servicePortName: "http"
 * });
 * ```
 * @category utils
 * @return {Deployment}
 */
export const createIngress = (params: IngressConfig): Ingress => {
  const hosts = params.hosts;
  const annotations: Record<string, string> = {
    "kubernetes.io/ingress.class": "nginx",
    ...(params.annotations ?? {}),
  };
  if (params.isProduction) {
    annotations["certmanager.k8s.io/cluster-issuer"] = "letsencrypt-prod";
    annotations["kubernetes.io/tls-acme"] = "true";
  }
  const isRedirectionIngress =
    !!annotations["nginx.ingress.kubernetes.io/permanent-redirect"];

  return new Ingress({
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
              servicePortName: params.servicePortName,
            })),
      })),
      tls: [
        {
          hosts: hosts,
          secretName:
            params.secretName ??
            (params.isProduction ? `${params.name}-crt` : "wildcard-crt"),
        },
      ],
    },
  });
};

export default createIngress;
