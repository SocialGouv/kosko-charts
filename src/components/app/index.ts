/* eslint-disable */
import { Environment } from "@kosko/env";
import { SealedSecret } from "@kubernetes-models/sealed-secrets/bitnami.com/v1alpha1/SealedSecret";
import { ok } from "assert";
import { ConfigMap } from "kubernetes-models/_definitions/IoK8sApiCoreV1ConfigMap";
import { EnvFromSource } from "kubernetes-models/v1/EnvFromSource";
import environments from "@socialgouv/kosko-charts/environments";
import { addToEnvFrom } from "@socialgouv/kosko-charts/utils/addToEnvFrom";
import createDeployment, {
  DeploymentParams,
} from "@socialgouv/kosko-charts/utils/createDeployment";
import createIngress, {
  IngressConfig as IngressParams,
} from "@socialgouv/kosko-charts/utils/createIngress";
import createService, {
  CreateServiceParams,
} from "@socialgouv/kosko-charts/utils/createService";
import { loadYaml } from "@socialgouv/kosko-charts/utils/getEnvironmentComponent";
import { updateMetadata } from "@socialgouv/kosko-charts/utils/updateMetadata";
import { merge } from "@socialgouv/kosko-charts/utils/@kosko/env/merge";
import { addPostgresUserSecret } from "@socialgouv/kosko-charts/utils/addPostgresUserSecret";
import { addWaitForPostgres } from "@socialgouv/kosko-charts/utils/addWaitForPostgres";

type AliasParams = {
  hosts: string[];
  destination: string;
};

export type AppConfig = DeploymentParams &
  CreateServiceParams &
  IngressParams & {
    subdomain: string;
    subDomainPrefix: string;
    domain: string;
    labels: Record<string, string>;
    ingress: boolean;
    withPostgres: boolean;
    withRedirections?: AliasParams;
  };

export type CreateFnDeploymentArgs = Partial<
  Omit<DeploymentParams, "containerPort">
>;
export type CreateFnArgs = {
  env: Environment;
  config?: Partial<AppConfig>;
  deployment?: CreateFnDeploymentArgs;
};
export type CreateFn = (
  name: string,
  { env, config, deployment: deploymentParams }: CreateFnArgs
) => Promise<{ kind: string }[]>;

export const create: CreateFn = async (
  name,
  { env, config, deployment: deploymentParams }
) => {
  const manifests = [];

  const defaultEnvParams: Partial<AppConfig> = {
    containerPort: 3000,
    name,
    servicePort: 80,
    annotations: {
      "kapp.k14s.io/disable-default-ownership-label-rules": "",
      "kapp.k14s.io/disable-default-label-scoping-rules": "",
      "kapp.k14s.io/delete-strategy": "orphan",
    },
  };

  const ciEnv = environments(process.env);

  // kosko component env values
  const envParams = merge(
    defaultEnvParams, // set name as default if not provided
    ciEnv.metadata,
    config ?? {}, // create options
    env.component(name) as AppConfig // kosko env overrides
  );

  const { containerPort, servicePort } = envParams;

  const deployment = createDeployment(
    merge(
      envParams,
      {
        registry: ciEnv.registry,
        sha: ciEnv.sha,
        tag: ciEnv.tag,
      } as DeploymentParams,
      deploymentParams || {}
    )
  );
  updateMetadata(deployment, {
    annotations: envParams.annotations || {},
    labels: envParams.labels || {},
    namespace: envParams.namespace,
    name,
  });
  manifests.push(deployment);

  // add postgres secret and initContainer
  if (envParams.withPostgres) {
    addPostgresUserSecret(deployment);
    addWaitForPostgres(deployment);
  }

  // add a redirection ingresses, production only
  if (env.env === "prod" && envParams.withRedirections) {
    const { hosts, destination } = envParams.withRedirections;
    const redirectIngress = createIngress({
      name: `${name}-redirects`,
      hosts,
      secretName: `${name}-redirects`,
      annotations: {
        "nginx.ingress.kubernetes.io/permanent-redirect": `https://${destination}$request_uri`,
      },
      isProduction: ciEnv.isProduction,
    });
    manifests.push(redirectIngress);
  }

  /* SEALED-SECRET */
  // try to import environment sealed-secret
  const secret = await loadYaml<SealedSecret>(
    env,
    `${name}.sealed-secret.yaml`
  );
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
  const configMap = await loadYaml<ConfigMap>(env, `${name}.configmap.yaml`);
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

  const MAX_HOSTNAME_SIZE = 53;
  const shortenHost = (hostname: string) =>
    hostname.slice(0, MAX_HOSTNAME_SIZE).replace(/-+$/, "");

  /* INGRESS */
  if (envParams.ingress !== false) {
    let hosts = [
      `${shortenHost(
        (envParams.subDomainPrefix || "") + ciEnv.metadata.subdomain
      )}.${ciEnv.metadata.domain}`,
    ];

    if (env.env === "prod") {
      hosts = [
        `${shortenHost(
          (envParams.subDomainPrefix || "") +
            (envParams.subdomain || ciEnv.metadata.subdomain)
        )}.${envParams.domain || ciEnv.metadata.domain}`,
      ];
    }

    const ingress = createIngress({
      name,
      hosts,
      serviceName: name,
      isProduction: ciEnv.isProduction,
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
