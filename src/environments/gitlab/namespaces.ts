//

import { NamespaceComponentEnvironment } from "@socialgouv/kosko-charts/types";

export default (env = process.env): NamespaceComponentEnvironment => {
  return {
    annotations: {
      // Add git metadata to be able to auto destroy that namespaces
      // see https://github.com/SocialGouv/docker/tree/v0.18.0/k8s-ns-killer
      "git/remote": env.CI_REPOSITORY_URL ?? "",
      "git/branch": env.CI_COMMIT_REF_NAME ?? "",
      // Fake rancher namespace creation
      "field.cattle.io/projectId": env.RANCHER_PROJECT_ID ?? "",
      "field.cattle.io/creatorId": "gitlab",
    },
    labels: {
      cert: "wildcard",
    },
  };
};
