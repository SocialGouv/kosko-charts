/* eslint-disable */
import { Environment } from "@kosko/env";
import { SealedSecret } from "@kubernetes-models/sealed-secrets/bitnami.com/v1alpha1/SealedSecret";
import { ok } from "assert";
import { ConfigMap } from "kubernetes-models/_definitions/IoK8sApiCoreV1ConfigMap";
import { EnvFromSource } from "kubernetes-models/v1/EnvFromSource";
import { IoK8sApiCoreV1PersistentVolumeClaim } from "kubernetes-models/_definitions/IoK8sApiCoreV1PersistentVolumeClaim";
import { PersistentVolume } from "kubernetes-models/_definitions/IoK8sApiCoreV1PersistentVolume";
import { PersistentVolumeClaim } from "kubernetes-models/_definitions/IoK8sApiCoreV1PersistentVolumeClaim";
import { IoK8sApiCoreV1AzureFilePersistentVolumeSource } from "kubernetes-models/_definitions/IoK8sApiCoreV1AzureFilePersistentVolumeSource";
import { IPersistentVolumeSpec } from "kubernetes-models/v1/PersistentVolumeSpec";

import gitlab from "../../environments/gitlab";
import { addToEnvFrom } from "../../utils/addToEnvFrom";
import createDeployment, {
  DeploymentParams,
} from "../../utils/createDeployment";
import createStatefulSet, {
  StatefulSetParams,
} from "../../utils/createStatefulSet";
import createIngress, {
  IngressConfig as IngressParams,
} from "../../utils/createIngress";
import createService, { CreateServiceParams } from "../../utils/createService";
import { loadYaml } from "../../utils/getEnvironmentComponent";
import { updateMetadata } from "../../utils/updateMetadata";
import { merge } from "../../utils/@kosko/env/merge";
import { addPostgresUserSecret } from "../../utils/addPostgresUserSecret";
import { addWaitForPostgres } from "../../utils/addWaitForPostgres";
import { VolumeMount } from "kubernetes-models/_definitions/IoK8sApiCoreV1VolumeMount";
import { StatefulSet } from "kubernetes-models/apps/v1/StatefulSet";

const DEFAULT_PV_SIZE = "10Gi";

const removeFromArray = (arr: any[], item: any) => {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === item) {
      arr.splice(i, 1);
    }
  }
  return arr;
};

//type PV
type AliasParams = {
  hosts: string[];
  destination: string;
};

export type Volume = {
  name: string;
  mountPath: string;
  azureFile?: {
    shareName: string;
    secretName: string;
  };
};

export type AppConfig = DeploymentParams &
  StatefulSetParams &
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

export type createFn = (
  name: string,
  {
    env,
    config,
    deployment: deploymentParams,
    volumes,
  }: {
    env: Environment;
    config?: Partial<AppConfig>;
    deployment?: Partial<
      Omit<DeploymentParams | StatefulSetParams, "containerPort">
    >;
    volumes?: Volume[];
  }
) => { apiVersion: string; kind: string }[];

export const create: createFn = (
  name,
  { env, config, deployment: deploymentParams, volumes }
) => {
  ok(process.env.CI_REGISTRY_IMAGE);
  ok(process.env.CI_ENVIRONMENT_URL);
  const manifests = [];

  const defaultEnvParams: Partial<AppConfig> = {
    containerPort: 3000,
    name,
    servicePort: 80,
    annotations: {
      "kapp.k14s.io/disable-default-ownership-label-rules": "",
      "kapp.k14s.io/disable-default-label-scoping-rules": "",
    },
  };

  const gitlabEnv = gitlab(process.env);

  // kosko component env values
  const envParams = merge(
    defaultEnvParams, // set name as default if not provided
    gitlabEnv,
    config ?? {}, // create options
    env.component(name) as AppConfig // kosko env overrides
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

  // add postgres secret and initContainer
  if (envParams.withPostgres) {
    addPostgresUserSecret(deployment);
    addWaitForPostgres(deployment);
  }

  // add a redirection ingress, production only
  if (env.env === "prod" && envParams.withRedirections) {
    const { hosts, destination } = envParams.withRedirections;
    const redirectIngress = createIngress({
      name: `${name}-redirects`,
      hosts,
      secretName: `${name}-redirects`,
      annotations: {
        "nginx.ingress.kubernetes.io/permanent-redirect": `https://${destination}$request_uri`,
      },
    });
    manifests.push(redirectIngress);
  }

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
    let hosts = [
      `${(envParams.subDomainPrefix || "") + gitlabEnv.subdomain}.${
        gitlabEnv.domain
      }`,
    ];

    if (env.env === "prod") {
      hosts = [
        `${
          (envParams.subDomainPrefix || "") +
          (envParams.subdomain || gitlabEnv.subdomain)
        }.${envParams.domain || gitlabEnv.domain}`,
      ];
    }

    const ingress = createIngress({
      name,
      hosts,
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

  // persistent volumes definitions
  // stateful : create a statefulset + PV + PVC
  // stateless : attach ephemeral volume
  if (volumes && volumes.length) {
    const isDev = env.env !== "prod" && env.env !== "preprod";
    const isStateful = !isDev;
    const persistentVolumeReclaimPolicy = isStateful ? "Retain" : "Delete";
    const accessModes = ["ReadWriteMany"];

    // container volumesMount
    const volumeMounts = volumes.map(
      ({ name, mountPath }) =>
        ({
          mountPath,
          name,
        } as VolumeMount)
    );

    // add volumes in the deployment manifest
    if (deployment?.spec?.template.spec) {
      if (!isStateful) {
        deployment.spec.template.spec.volumes = volumes.map(({ name }) => ({
          name,
        }));
      }
      deployment.spec.template.spec.containers[0].volumeMounts = volumeMounts;
    }

    // replace the deployment with a statefulset when needed
    if (isStateful) {
      // create PersistentVolume manifests
      volumes.forEach(({ azureFile, name }) => {
        const spec = {
          storageClassName: name,
          accessModes,
          capacity: { storage: DEFAULT_PV_SIZE },
          persistentVolumeReclaimPolicy,
        } as IPersistentVolumeSpec;

        if (azureFile) {
          spec.azureFile = {
            secretNamespace: envParams.namespace.name,
            ...azureFile,
          };
        }
        const metadata = {
          name: `pv-${name}`,
          labels: { usage: `pv-${name}` },
        };

        const pv = new PersistentVolume({ metadata, spec });
        manifests.push(pv);
      });

      // create PersistentVolumeClaim templates
      const volumeClaimTemplates = volumes.map(
        ({ name }) =>
          new PersistentVolumeClaim({
            metadata: { name },
            spec: {
              accessModes,
              resources: { requests: { storage: DEFAULT_PV_SIZE } },
              storageClassName: name,
            },
          })
      );

      if (deployment.spec?.template) {
        const statefulset = new StatefulSet({
          metadata: deployment.metadata,
          spec: {
            template: deployment.spec.template,
            replicas: 1,
            selector: deployment.spec.selector,
            serviceName: name,
            volumeClaimTemplates,
          },
        });
        removeFromArray(manifests, deployment);
        manifests.unshift(statefulset);
      }
    }
  }
  return manifests;
};
