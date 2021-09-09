import { restoreDbFromFile } from "@socialgouv/kosko-charts/components/azure-pg";
import ci from "@socialgouv/kosko-charts/environments";
import type { IJob } from "kubernetes-models/batch/v1";

import Config from "../../utils/config";

export default async (): Promise<IJob | never[]> => {
  const { name, restoreDb } = await Config();

  const env = ci(process.env);

  if (!restoreDb) {
    return Promise.resolve([]);
  }

  return restoreDbFromFile(name, {
    filePath: restoreDb,
    repository: `${env.metadata.git.remote}`,
  });
};
