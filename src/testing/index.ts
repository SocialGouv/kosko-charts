import { merge } from "@socialgouv/kosko-charts/utils/merge";
import { config } from "dotenv";
import { resolve } from "path";

import { execAsync } from "./execAsync";
import { getNodeModulesBin } from "./getNodeModulesBin";

export const getEnvManifests = async (envName: string): Promise<string> => {
  const BIN = await getNodeModulesBin();

  const { stdout } = await execAsync(
    `${resolve(BIN, "kosko")} generate --env ${envName}`,
    {
      cwd: process.cwd(),
      env: merge(
        {
          FORCE_COLOR: "0",
        },
        // Global env
        config({
          path: resolve(process.cwd(), "environments", ".gitlab.env"),
        }).parsed ?? {},
        // Env env
        config({
          path: resolve(process.cwd(), "environments", envName, ".gitlab.env"),
        }).parsed ?? {}
      ),
    }
  );

  return stdout;
};
