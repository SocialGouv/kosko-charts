import koskoEnv from "@kosko/env";
import { loadFile } from "@kosko/yaml";
import type { SealedSecret } from "@kubernetes-models/sealed-secrets/bitnami.com/v1alpha1";
import type { ConfigMap } from "kubernetes-models/v1";
import { EnvVar } from "kubernetes-models/v1";
import path from "path";

import { addEnv, getDeployment, getIngressHost } from "../../utils";
import environments from "../../environments";
import { AppConfig, create as appCreate } from "../app";

interface ProxyParams {
  upstream: string;
  config?: Partial<AppConfig>;
}

// renovate: datasource=docker depName=sosedoff/pgweb versioning=v7.2.0
const OAUTH2_PROXY_VERSION = "v7.2.0";

// load some YAML from user env
const loadEnvYaml = async (fileName: string) => {
  return (
    await loadFile(
      path.join(koskoEnv.cwd, `environments/${koskoEnv.env}/${fileName}`),
      {
        transform: (manifest) => {
          // force fix namespace
          const ciEnv = environments(process.env);
          if (manifest.metadata) {
            manifest.metadata.namespace = ciEnv.metadata.namespace.name;
          }
          return manifest;
        },
      }
    )()
  )[0];
};

/*
create an oauth-proxy deployment+service+ingress

expect these files :
 - environments/[env]/oauth2-proxy-configmap.yaml
 - environments/[env]/oauth2-proxy-sealed-secret.yaml
*/
export const create = async ({ upstream, config = {} }: ProxyParams) => {
  // expect dedicated configmap
  const configMap = (await loadEnvYaml(
    "oauth2-proxy-configmap.yml"
  )) as ConfigMap;
  // expect dedicated secret
  const sealedSecret = (await loadEnvYaml(
    "oauth2-proxy-sealed-secret.yml"
  )) as SealedSecret;

  const manifests = await appCreate("proxy", {
    config: {
      container: {
        args: ["--upstream", upstream],
        env: [
          new EnvVar({
            name: "OAUTH2_PROXY_HTTP_ADDRESS",
            value: "0.0.0.0:4180",
          }),
        ],
        envFrom: [
          {
            configMapRef: { name: configMap.metadata?.name },
          },
          {
            secretRef: { name: sealedSecret.metadata?.name },
          },
        ],
        livenessProbe: {
          httpGet: {
            path: "/ping",
            port: "http",
          },
        },
        readinessProbe: {
          httpGet: {
            path: "/ping",
            port: "http",
          },
        },
        startupProbe: {
          httpGet: {
            path: "/ping",
            port: "http",
          },
        },
      },
      containerPort: 4180,
      image: `quay.io/oauth2-proxy/oauth2-proxy:${OAUTH2_PROXY_VERSION}`,
      ...config,
    },
    env: koskoEnv,
  });

  const deployment = getDeployment(manifests);
  const hostName = getIngressHost(manifests);

  // TODO: has no effect with github
  addEnv({
    data: new EnvVar({
      name: "OAUTH2_PROXY_REDIRECT_URL",
      value: `https://${hostName}/oauth2/callback`,
    }),
    deployment,
  });

  return [configMap, sealedSecret, manifests];
};
