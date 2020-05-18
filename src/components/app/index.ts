import {
  AppComponentEnvironment,
  GlobalEnvironment,
} from "@socialgouv/kosko-charts/types";
import { fold } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";
import * as t from "io-ts";
import { NonEmptyString } from "io-ts-types/lib/NonEmptyString";
import { failure } from "io-ts/lib/PathReporter";
import { Deployment } from "kubernetes-models/apps/v1/Deployment";
import { Ingress } from "kubernetes-models/extensions/v1beta1/Ingress";
import { Service } from "kubernetes-models/v1/Service";

export type Params = AppComponentEnvironment & GlobalEnvironment;

export const create = (
  params: Params
): { deployment: Deployment; ingress: Ingress; service: Service } => {
  assertType(params);

  const matchLabels = { app: params.name };
  const metadata = {
    name: params.name,
    labels: { ...matchLabels, ...params.labels },
    namespace: params.namespace.name,
  };

  const host = `${params.subdomain}.${params.domain}`;

  return {
    deployment: new Deployment({
      metadata,
      spec: {
        replicas: 1,
        selector: {
          matchLabels: { app: metadata.name },
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
                    ...params.limits,
                  },
                  requests: {
                    cpu: "5m",
                    memory: "16Mi",
                    ...params.requests,
                  },
                },
              },
            ],
          },
        },
      },
    }),
    ingress: new Ingress({
      metadata: {
        ...metadata,
        annotations: {
          "appgw.ingress.kubernetes.io/ssl-redirect": "true",
          "certmanager.k8s.io/cluster-issuer": "letsencrypt-prod",
          "kubernetes.io/ingress.class": "azure/application-gateway",
          "kubernetes.io/tls-acme": "true",
          ...params?.ingress?.annotations,
        },
      },
      spec: {
        rules: [
          {
            host,
            http: {
              paths: [
                {
                  path: "/",
                  backend: {
                    serviceName: metadata.name,
                    servicePort: params.servicePort,
                  },
                },
              ],
            },
          },
        ],
        tls: [
          {
            hosts: [host],
            secretName: params.ingress?.secretName,
          },
        ],
      },
    }),
    service: new Service({
      metadata,
      spec: {
        selector: matchLabels,
        type: "ClusterIP",
        ports: [
          {
            port: params.servicePort,
            targetPort: params.containerPort,
          },
        ],
      },
    }),
  };
};

function assertType(params: Params): Partial<Params> | never {
  return pipe(
    params,
    t.type(
      {
        containerPort: t.Integer,
        image: t.type({
          name: NonEmptyString,
          tag: NonEmptyString,
        }),
        name: t.string,
        namespace: t.type({
          name: NonEmptyString,
        }),
        servicePort: t.Integer,
      },
      "AppComponentParams"
    ).decode,
    fold(
      (errors) => {
        throw new Error(
          [
            "Invalid config provided:",
            "- " + failure(errors).join("\n- ").replace(/\//g, "."),
          ].join("\n")
        );
      },
      (_) => _
    )
  );
}
