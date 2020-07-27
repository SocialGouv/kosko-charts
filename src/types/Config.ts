import { IIoK8sApimachineryPkgApisMetaV1ObjectMeta } from "kubernetes-models/_definitions/IoK8sApimachineryPkgApisMetaV1ObjectMeta";

interface Config {
  app: {
    metadata: IIoK8sApimachineryPkgApisMetaV1ObjectMeta;
    domain: string;
    subdomain: string;
  };
  namespace: { metadata: IIoK8sApimachineryPkgApisMetaV1ObjectMeta };
  registry: string;
}

export default Config;
