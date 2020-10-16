import gitlab from "@socialgouv/kosko-charts/environments/gitlab";
import { merge } from "@socialgouv/kosko-charts/utils/merge";
import { Namespace as K8SNamespace } from "kubernetes-models/v1/Namespace";

export const createNamespace = (
  // eslint-disable-next-line @typescript-eslint/ban-types
  config: object = {}
): K8SNamespace => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const envParams = merge(
    gitlab(process.env),
    config // create options
  );
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
