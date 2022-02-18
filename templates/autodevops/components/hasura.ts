import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/hasura";
import { getGithubRegistryImagePath } from "@socialgouv/kosko-charts/utils/getGithubRegistryImagePath";
import { getHarborImagePath } from "@socialgouv/kosko-charts/utils/getHarborImagePath";

import type { Manifests } from "../types/config";
import Config from "../utils/config";

export default async (): Manifests => {
  let resources = null;
  let exposed = false;
  let containerPort = null;
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
    containerPort = hasura?.containerPort;
  }

  const config = {
    config: { ingress: exposed, ...(containerPort ? { containerPort } : {}) },
    deployment: {
      container: {},
      image,
    },
    env,
  };

  if (resources) {
    config.deployment.container = { resources };
  }

  if (hasura) {
    const manifests = await create("hasura", config);
    return manifests;
  } else {
    return Promise.resolve([]);
  }
};
