import { merge } from "@socialgouv/kosko-charts/utils/merge";
import { config } from "dotenv";
import { resolve } from "path";

import { execAsync } from "./execAsync";

export const getEnvManifests = async (
  envName = "",
  koskoArgs = ""
): Promise<string> => {
  const koskoEnvArgs = envName ? `--env ${envName}` : "";
  const { stdout } = await execAsync(
    `npx --no-install kosko generate ${koskoEnvArgs} ${koskoArgs}`.trim(),
    {
      cwd: process.cwd(),
      env: merge(
        process.env,
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
