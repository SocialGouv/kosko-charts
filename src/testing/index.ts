import { merge } from "@socialgouv/kosko-charts/utils/merge";
import { config } from "dotenv";
import { resolve } from "path";

import { execAsync } from "./execAsync";
import { getGitlabEnv } from "./getGitlabEnv";

type EnvName = "dev" | "preprod" | "prod";

export const getEnvManifests = async (
  envName: EnvName = "dev",
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
        getGitlabEnv({
          project: "your-app",
          env: envName,
        })
      ),
    }
  );

  return stdout;
};
