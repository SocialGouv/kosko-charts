import gitlab from "@socialgouv/kosko-charts/environments/gitlab";
import type { NamespaceComponentEnvironment } from "@socialgouv/kosko-charts/types";
import { merge } from "@socialgouv/kosko-charts/utils/merge";
import { Namespace as K8SNamespace } from "kubernetes-models/v1/Namespace";

export const createNamespace = (
  config?: NamespaceComponentEnvironment
): K8SNamespace => {
  const gitlabEnv = gitlab(process.env);
  const owner = gitlabEnv.labels?.owner;

  const envParams = merge(gitlab(process.env), config ?? {});

  const namespace = new K8SNamespace({
    metadata: {
      annotations: {
        "field.cattle.io/creatorId": "gitlab",
        "field.cattle.io/projectId": envParams.rancherId ?? "",
        "git/branch": envParams.git.branch ?? "",
        "git/remote": envParams.git.remote ?? "",
        ...envParams.annotations,
      },
      labels: {
        ...(owner
          ? {
              "kubed.appscode.com/sync": owner,
            }
          : {}),
        ...envParams.labels,
      },
      name: envParams.namespace.name,
    },
  });
  return namespace;
};
