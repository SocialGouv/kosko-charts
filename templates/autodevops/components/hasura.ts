import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/hasura";
import { getGithubRegistryImagePath } from "@socialgouv/kosko-charts/utils/getGithubRegistryImagePath";
import { getHarborImagePath } from "@socialgouv/kosko-charts/utils/getHarborImagePath";

import type { Manifests } from "../types/config";
import Config from "../utils/config";

export default async (): Manifests => {
  const { hasura, name: appName, registry } = await Config();

  const name = "hasura";

  const image =
    registry === "ghcr"
      ? getGithubRegistryImagePath({ name, project: appName })
      : getHarborImagePath({ name: `${appName}-hasura` });

  const config = {
    config: { ingress: hasura === "exposed" },
    deployment: { image },
    env,
  };

  if (hasura) {
    const manifests = await create("hasura", config);
    return manifests;
  } else {
    return Promise.resolve([]);
  }
};
