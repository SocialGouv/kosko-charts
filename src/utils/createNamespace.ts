import { Namespace as K8SNamespace } from "kubernetes-models/v1/Namespace";

import gitlab from "../environments/gitlab";

export const createNamespace = (
  // eslint-disable-next-line @typescript-eslint/ban-types
  config: object = {}
): K8SNamespace => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const envParams = {
    ...gitlab(process.env),
    ...config, // create options
  };
  const namespace = new K8SNamespace({
    metadata: {
      annotations: {
        "field.cattle.io/creatorId": "gitlab",
        "field.cattle.io/projectId": envParams.rancherId ?? "",
        "git/branch": envParams.git.branch ?? "",
        "git/remote": envParams.git.remote ?? "",
        ...envParams.annotations,
      },
      labels: envParams.labels,
      name: envParams.namespace.name,
    },
  });
  return namespace;
};
