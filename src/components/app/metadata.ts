import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "kubernetes-models/_definitions/IoK8sApimachineryPkgApisMetaV1ObjectMeta";

import { matchLabelsFromParams } from "./matchLabels";
import { Params } from "./params";

export const metadataFromParams = (
  params: Params
): IIoK8sApimachineryPkgApisMetaV1ObjectMeta & { name: string } => ({
  labels: { ...matchLabelsFromParams(params), ...(params.labels ?? {}) },
  name: params.name,
  namespace: params.namespace.name,
});
