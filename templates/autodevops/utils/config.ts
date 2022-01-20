import type { IIoK8sApiCoreV1Probe } from "kubernetes-models/v1/Probe";
import type { IIoK8sApiCoreV1ResourceRequirements } from "kubernetes-models/v1/ResourceRequirements";

interface Probes {
  startupProbe?: IIoK8sApiCoreV1Probe;
  livenessProbe?: IIoK8sApiCoreV1Probe;
  readinessProbe?: IIoK8sApiCoreV1Probe;
}

interface Hasura {
  exposed: boolean;
  resources: Record<string, unknown>;
}

interface ConfigTypes {
  name: string;
  /** app or static */
  type: string;
  /** force deployment sudomain */
  subdomain: string;
  hasura?: Hasura | boolean | "exposed";
  azurepg?: boolean;
  /** define a custom pgHost for development */
  pgHostDev?: string;
  /** redefines k8s probes */
  probes?: Probes;
  /** redefines k8s resources */
  resources?: IIoK8sApiCoreV1ResourceRequirements;
  /** redefines default probes path (/healthz) */
  probesPath?: string;
  /** override ingress annotations */
  ingress?: {
    annotations?: Record<string, string>;
  };
  /** ghcr or harbor */
  registry?: string;
  /** project name */
  project?: string;

  restoreDb?: string;
  /** set to false to deisable default network policy */
  netpol?: boolean;
  /** force containerPort for app and static deployments */
  containerPort?: number;
  /** add an init container with custom command on the main container. used in dev. ex: ["yarn", "seed"] */
  devInitContainerCommand?: string[];
}

const Config = async (): Promise<ConfigTypes> => {
  const path =
    process.env.SOCIALGOUV_CONFIG_PATH ?? "../../.socialgouv/config.json";

  return (await import(path)) as ConfigTypes;
};

export default Config;
