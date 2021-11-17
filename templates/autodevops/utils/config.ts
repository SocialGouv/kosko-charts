import type { IIoK8sApiCoreV1Probe } from "kubernetes-models/v1/Probe";
import type { IIoK8sApiCoreV1ResourceRequirements } from "kubernetes-models/v1/ResourceRequirements";

interface Probes {
  startupProbe?: IIoK8sApiCoreV1Probe;
  livenessProbe?: IIoK8sApiCoreV1Probe;
  readinessProbe?: IIoK8sApiCoreV1Probe;
}

interface ConfigTypes {
  name: string;
  type: string;
  subdomain: string;
  hasura?: boolean | "exposed";
  azurepg?: boolean;
  pgPrefix?: string;
  probes?: Probes;
  resources?: IIoK8sApiCoreV1ResourceRequirements;
  probesPath?: string;
  ingress?: {
    annotations?: Record<string, string>;
  };
  registry?: string;
  project?: string;
  restoreDb?: string;
}

const Config = async (): Promise<ConfigTypes> => {
  const path =
    process.env.SOCIALGOUV_CONFIG_PATH ?? "../../.socialgouv/config.json";

  return (await import(path)) as ConfigTypes;
};

export default Config;
