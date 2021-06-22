import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/hasura";
import { getHarborImagePath } from "@socialgouv/kosko-charts/utils/getHarborImagePath";

import type { Manifests } from "../types/config";
import Config from "../utils/config";

export default async (): Manifests => {
  const { name, hasura } = Config();

  const config = {
    config: { ingress: hasura === "exposed" },
    deployment: {
      image: getHarborImagePath({ name: `${name}-hasura` }),
    },
    env,
  };

  if (hasura) {
    const manifests = await create("hasura", config);
    return manifests;
  } else {
    return Promise.resolve([]);
  }
};
