import { IIoK8sApiCoreV1ResourceRequirements } from "kubernetes-models/v1/ResourceRequirements";
import { IIoK8sApiCoreV1Probe } from "kubernetes-models/v1/Probe";

type Probes = {
  startupProbe?: IIoK8sApiCoreV1Probe;
  livenessProbe?: IIoK8sApiCoreV1Probe;
  readinessProbe?: IIoK8sApiCoreV1Probe;
};

type Resources = {
  requests?: Object;
  limits?: Object;
};

type ConfigTypes = {
  name: string;
  type: string;
  subdomain: string;
  hasura?: boolean | "exposed";
  azurepg?: boolean;
  probes?: Probes;
  resources?: IIoK8sApiCoreV1ResourceRequirements;
  probesPath?: string;
  ingress?: {
    annotations?: Record<string, string>
  }
  registry?:  string;
  project?:  string;
};

const Config = () => {
  const config = require(process.env.SOCIALGOUV_CONFIG_PATH ??
    "../../.socialgouv/config.json");

  return config as ConfigTypes;
};

export default Config;
