import md5 from "md5";

import type { PgParams } from "./types";

type PgDatabaseParams = Omit<PgParams, "host" | "name">;

export function getDevDatabaseParameters({
  suffix,
}: {
  suffix: string;
}): PgDatabaseParams {
  // dummy encryption
  const salt = "s0ci@lG0uv";
  const password = md5(salt + suffix);
  return {
    database: `autodevops_${suffix}`,
    password,
    user: `user_${suffix}`,
  };
}
