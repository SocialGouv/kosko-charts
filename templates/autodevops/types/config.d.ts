import type { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "kubernetes-models/_definitions/IoK8sApimachineryPkgApisMetaV1ObjectMeta";

declare type Manifests = Promise<{ kind: string }[] | []>;

declare type Manifest =
  | {
      metadata?: IIoK8sApimachineryPkgApisMetaV1ObjectMeta | undefined;
      spec?: unknown;
    }
  | undefined;
