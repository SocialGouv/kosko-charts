import type { Environment } from "@kosko/env";
import type { SealedSecret } from "@kubernetes-models/sealed-secrets/bitnami.com/v1alpha1/SealedSecret";
import { createSecret } from "@socialgouv/kosko-charts/components/pg-secret";
import environments from "@socialgouv/kosko-charts/environments";
import { loadYaml } from "@socialgouv/kosko-charts/utils/getEnvironmentComponent";
import { updateMetadata } from "@socialgouv/kosko-charts/utils/updateMetadata";

import { autodevopsPgUserParams } from "./autodevops-user-params";
import { createDbJob } from "./create-db.job";

export const create = async (
  name: string,
  { env }: { env: Environment }
): Promise<{ kind: string }[]> => {
  const ciEnv = environments(process.env);

  // in prod/preprod, we try to add a fixed sealed-secret
  const existingSecret = await loadYaml<SealedSecret>(
    env,
    `${name}.sealed-secret.yaml`
  );

  if (existingSecret) {
    updateMetadata(existingSecret, {
      annotations: ciEnv.metadata.annotations ?? {},
      labels: ciEnv.metadata.labels ?? {},
      namespace: ciEnv.metadata.namespace,
    });

    return [existingSecret];
  }

  if (ciEnv.isProduction || ciEnv.isPreProduction) {
    throw new Error(`Missing envs/${env.env}/${name}.sealed-secret.yaml`);
  }

  const currentBranchParams = autodevopsPgUserParams(ciEnv.branchSlug);

  const job = createDbJob(`create-db-job-${ciEnv.branch}`, currentBranchParams);

  const secret = createSecret(currentBranchParams.name, currentBranchParams);

  return [job, secret];
};
