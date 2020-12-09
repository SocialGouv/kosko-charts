import { merge } from "@socialgouv/kosko-charts/utils/merge";
import { config } from "dotenv";
import { resolve } from "path";

import { execAsync } from "./execAsync";

export const getEnvManifests = async (
  envName = "",
  koskoArgs = "",
  env: Record<string, string> = {}
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
        env,
        // Global env
        config({
          path: resolve(process.cwd(), "environments", ".gitlab-ci.env"),
        }).parsed ?? {},
        // Env env
        (envName &&
          config({
            path: resolve(
              process.cwd(),
              "environments",
              envName,
              ".gitlab-ci.env"
            ),
          }).parsed) ??
          {}
      ),
    }
  );

  return stdout;
};
