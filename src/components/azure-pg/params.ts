import type { PgParams } from "./types";

type PgDatabaseParams = Omit<PgParams, "host" | "name">;

export function getDevDatabaseParameters({
  suffix,
}: {
  suffix: string;
}): PgDatabaseParams {
  return {
    database: `autodevops_${suffix}`,
    password: `password_${suffix}`,
    user: `user_${suffix}`,
  };
}
