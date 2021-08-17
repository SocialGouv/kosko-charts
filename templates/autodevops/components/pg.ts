import env from "@kosko/env";
import type { SealedSecret } from "@kubernetes-models/sealed-secrets/bitnami.com/v1alpha1/SealedSecret";
// import { create } from "@socialgouv/kosko-charts/components/azure-pg";
import { create } from "@socialgouv/kosko-charts/components/azure-pg";
import environments from "@socialgouv/kosko-charts/environments";
import { loadYaml } from "@socialgouv/kosko-charts/utils/getEnvironmentComponent";
import { updateMetadata } from "@socialgouv/kosko-charts/utils/updateMetadata";

import type { Manifest } from "../types/config";
import Config from "../utils/config";

export default async (): Promise<{ kind: string }[] | Manifest[]> => {
  const { azurepg } = await Config();
  const ciEnv = environments(process.env);

  if (!azurepg) {
    return [];
  }

  if (!ciEnv.isPreProduction && !ciEnv.isProduction) {
    return create("pg-user", { env });
  }

  // in prod/preprod, we try to add a fixed sealed-secret
  const secretName = "pg-user.sealed-secret.yaml";
  const secret = (await loadYaml<SealedSecret>(env, secretName)) as Manifest;

  if (!secret) {
    return [];
  }

  // add gitlab annotations
  updateMetadata(secret, {
    annotations: ciEnv.metadata.annotations ?? {},
    labels: ciEnv.metadata.labels ?? {},
    namespace: ciEnv.metadata.namespace,
  });

  return [secret];
};
