import github from "@socialgouv/kosko-charts/environments/github";
import type { NamespaceComponentEnvironment } from "@socialgouv/kosko-charts/types";
import { merge } from "@socialgouv/kosko-charts/utils/@kosko/env/merge";
import { Namespace as K8SNamespace } from "kubernetes-models/v1/Namespace";

export const createNamespace = (
  config?: NamespaceComponentEnvironment
): K8SNamespace => {
  const githubEnv = github(process.env);
  const owner = githubEnv.labels?.owner;

  const envParams = merge(github(process.env), config ?? {});

  const namespace = new K8SNamespace({
    metadata: {
      annotations: {
        "field.cattle.io/creatorId": "github",
        "field.cattle.io/projectId": envParams.rancherId ?? "",
        "git/branch": envParams.git.branch ?? "",
        "git/remote": envParams.git.remote ?? "",
        ...envParams.annotations,
      },
      labels: {
        ...(owner
          ? {
              "azure-pg-admin-user": owner,
            }
          : {}),
        ...envParams.labels,
      },
      name: envParams.namespace.name,
    },
  });
  return namespace;
};
