import environments from "@socialgouv/kosko-charts/environments";
import type { NamespaceComponentEnvironment } from "@socialgouv/kosko-charts/types";
import { merge } from "@socialgouv/kosko-charts/utils/@kosko/env/merge";
import { Namespace as K8SNamespace } from "kubernetes-models/v1/Namespace";

export const createNamespace = (
  config?: Partial<NamespaceComponentEnvironment>
): K8SNamespace => {
  const ciEnv = environments(process.env);
  const owner = ciEnv.metadata.labels?.owner;

  const envParams = merge(ciEnv.metadata, config ?? {});

  const namespaceTtl = {} as Record<string, string>;

  // destroy devs env after 15 days, except if keepAlive set to false
  const isDev = !ciEnv.isPreProduction && !ciEnv.isProduction;
  const isDestroyable = isDev && !envParams.keepAlive;

  if (isDestroyable) {
    namespaceTtl["janitor/ttl"] = "15d";
  }
  const namespace = new K8SNamespace({
    metadata: {
      annotations: {
        "socialgouv/creator": "autodevops",
        ...namespaceTtl,
        "field.cattle.io/creatorId": "gitlab",
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
