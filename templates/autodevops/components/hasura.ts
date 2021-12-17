import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/hasura";
import { getGithubRegistryImagePath } from "@socialgouv/kosko-charts/utils/getGithubRegistryImagePath";
import { getHarborImagePath } from "@socialgouv/kosko-charts/utils/getHarborImagePath";

import type { Manifests } from "../types/config";
import Config from "../utils/config";

export default async (): Manifests => {
  let resources = null;
  let exposed = false;
  const { hasura, name: appName, project, registry } = await Config();

  const name = "hasura";

  const image =
    registry === "ghcr"
      ? getGithubRegistryImagePath({ name, project: project ?? appName })
      : getHarborImagePath({ name: `${appName}-hasura` });

  if (hasura === "exposed") {
    exposed = true;
  } else if (typeof hasura !== "boolean") {
    exposed = !!hasura?.exposed;
    resources = hasura?.resources;
  }

  const config = {
    config: { ingress: exposed },
    deployment: {
      container: {
        resources: resources ?? {
          limits: {
            cpu: "500m",
            memory: "512Mi",
          },
          requests: {
            cpu: "100m",
            memory: "64Mi",
          },
        },
      },
      image,
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
