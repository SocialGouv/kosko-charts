import path from "path";
import { Environment } from "@kosko/env";
import { ConfigMap, EnvVar } from "kubernetes-models/v1";
import { loadFile } from "@kosko/yaml";
import { SealedSecret } from "@kubernetes-models/sealed-secrets/bitnami.com/v1alpha1";

import { addEnv, getDeployment, getIngressHost } from "../..//utils";
import environments from "../../environments";
import { create as appCreate } from "../app";

interface ProxyParams {
  upstream: string;
  env: Environment;
}

// load some YAML from user env
const loadEnvYaml = async (fileName: string, env: Environment) => {
  console.log(env.cwd);
  console.log(path.join(env.cwd, `environments/${env.env}/${fileName}`));
  return (
    await loadFile(path.join(env.cwd, `environments/${env.env}/${fileName}`), {
      transform: (manifest: any) => {
        console.log("transform", manifest);
        // force fix namespace
        const ciEnv = environments(process.env);
        if (manifest.metadata) {
          manifest.metadata.namespace = ciEnv.metadata.namespace.name;
        }
        return manifest;
      },
    })()
  )[0];
};

/*
create an oauth-proxy deployment+service+ingress

expect these files :
 - environments/[env]/oauth2-proxy-configmap.yaml
 - environments/[env]/oauth2-proxy-sealed-secret.yaml
*/
export const create = async ({ upstream, env }: ProxyParams) => {
  // expect dedicated configmap
  const configMap = (await loadEnvYaml(
    "oauth2-proxy-configmap.yml",
    env
  )) as ConfigMap;
  // expect dedicated secret
  const sealedSecret = (await loadEnvYaml(
    "oauth2-proxy-sealed-secret.yml",
    env
  )) as SealedSecret;

  const manifests = await appCreate("proxy", {
    env,
    config: {
      image: "quay.io/oauth2-proxy/oauth2-proxy:v7.2.0",
      containerPort: 4180,
      container: {
        startupProbe: {
          httpGet: {
            path: "/ping",
            port: "http",
          },
        },
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
        args: ["--upstream", upstream],
        env: [
          new EnvVar({
            name: "OAUTH2_PROXY_HTTP_ADDRESS",
            value: "0.0.0.0:4180",
          }),
        ],
        envFrom: [
          {
            configMapRef: { name: configMap?.metadata?.name },
          },
          {
            secretRef: { name: sealedSecret?.metadata?.name },
          },
        ],
      },
    },
  });

  const deployment = getDeployment(manifests);
  const hostName = getIngressHost(manifests);

  // TODO: has no effect with github
  addEnv({
    deployment,
    data: new EnvVar({
      name: "OAUTH2_PROXY_REDIRECT_URL",
      value: `https://${hostName}/oauth2/callback`,
    }),
  });

  return [configMap, sealedSecret, manifests];
};
