import { GlobalEnvironment } from "@socialgouv/kosko-charts/types";
import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "kubernetes-models/_definitions/IoK8sApimachineryPkgApisMetaV1ObjectMeta";

import { matchLabelsFromParams } from "./matchLabels";

export const metadataFromParams = (
  params: GlobalEnvironment & { name: string }
): IIoK8sApimachineryPkgApisMetaV1ObjectMeta & { name: string } => ({
  annotations: params.annotations,
  labels: { ...matchLabelsFromParams(params), ...(params.labels ?? {}) },
  name: params.name,
  namespace: params.namespace.name,
});
