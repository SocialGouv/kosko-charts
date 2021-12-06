import { create } from "@socialgouv/kosko-charts/components/netpol";

import Config from "../utils/config";

const manifests = async () => {
  const { netpol } = await Config();
  if (netpol === false) return [];
  return create();
};

export default manifests;
