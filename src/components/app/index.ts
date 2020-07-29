/* eslint-disable */
import { Environment } from "@kosko/env";
import { SealedSecret } from "@kubernetes-models/sealed-secrets/bitnami.com/v1alpha1/SealedSecret";
import { ok } from "assert";
import { ConfigMap } from "kubernetes-models/_definitions/IoK8sApiCoreV1ConfigMap";
import { EnvFromSource } from "kubernetes-models/v1/EnvFromSource";

import gitlab from "../../environments/gitlab";
import { addToEnvFrom } from "../../utils/addToEnvFrom";
import createDeployment, {
  DeploymentParams,
} from "../../utils/createDeployment";
import createIngress, {
  IngressConfig as IngressParams,
} from "../../utils/createIngress";
import createService, {
  Params as ServiceParams,
} from "../../utils/createService";
import { loadYaml } from "../../utils/getEnvironmentComponent";
import { updateMetadata } from "../../utils/updateMetadata";
import { merge } from "../../utils/merge";

export type AppConfig = DeploymentParams &
  ServiceParams &
  IngressParams & {
    subdomain: string;
    domain: string;
    labels: Record<string, string>;
  };
export const create = (
  name: string,
  {
    env,
    config,
    deployment: deploymentParams,
  }: {
    env: Environment;
    config?: Partial<AppConfig>;
    deployment?: Partial<Omit<DeploymentParams, "containerPort">>;
  }
): { kind: string }[] => {
  ok(process.env.CI_REGISTRY_IMAGE);
  ok(process.env.CI_ENVIRONMENT_URL);
  const manifests = [];

  const defaultEnvParams: Partial<AppConfig> = {
    containerPort: 3000,
    name,
    servicePort: 80,
  };

  // kosko component env values
  const envParams = merge(
    defaultEnvParams, // set name as default if not provided
    gitlab(process.env),
    env.component(name) as AppConfig, // kosko env overrides
    config ?? {} // create options
  );

  const { containerPort, servicePort } = envParams;

  const deployment = createDeployment(merge(envParams, deploymentParams || {}));
  updateMetadata(deployment, {
    annotations: envParams.annotations || {},
    labels: envParams.labels || {},
    namespace: envParams.namespace,
    name,
  });
  manifests.push(deployment);

  /* SEALED-SECRET */
  // try to import environment sealed-secret
  const secret = loadYaml<SealedSecret>(env, `${name}.sealed-secret.yaml`);
  if (secret) {
    // add gitlab annotations
    updateMetadata(secret, {
      annotations: envParams.annotations || {},
      labels: envParams.labels || {},
      namespace: envParams.namespace,
    });
    // add to deployment.envFrom
    addToEnvFrom({
      data: [
        new EnvFromSource({
          secretRef: {
            name: secret.metadata?.name,
          },
        }),
      ],
      deployment,
    });
    manifests.push(secret);
  }

  /* CONFIGMAP */
  // try to import configmap
  const configMap = loadYaml<ConfigMap>(env, `${name}.configmap.yaml`);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (configMap) {
    // add gitlab annotations
    updateMetadata(configMap, {
      annotations: envParams.annotations || {},
      labels: envParams.labels || {},
      namespace: envParams.namespace,
    });
    // add to deployment.envFrom
    addToEnvFrom({
      data: [
        new EnvFromSource({
          configMapRef: {
            name: configMap.metadata?.name,
          },
        }),
      ],
      deployment,
    });
    manifests.push(configMap);
  }

  /* SERVICE */
  const service = createService({
    name,
    containerPort,
    servicePort,
    selector: { app: name },
  });
  // add gitlab annotations
  updateMetadata(service, {
    annotations: envParams.annotations || {},
    labels: envParams.labels || {},
    namespace: envParams.namespace,
    name,
  });
  manifests.push(service);

  /* INGRESS */
  if (envParams.ingress !== false) {
    const ingress = createIngress({
      name,
      host: `${envParams.subdomain}.${envParams.domain}`,
      serviceName: name,
      servicePort,
    });
    // add gitlab annotations
    updateMetadata(ingress, {
      annotations: envParams.annotations || {},
      labels: envParams.labels || {},
      namespace: envParams.namespace,
      name,
    });
    manifests.push(ingress);
  }

  return manifests;
};
