import type { Environment } from "@kosko/env";
import { migrateString } from "@kosko/migrate";
import { pathExists, readFileSync } from "fs-extra";
import { Module } from "module";
import { join } from "path";
import { runInThisContext } from "vm";

import { formatPath } from "./@kosko/env/paths";

export function tryRequireComponent(
  cwd: string,
  loader: (id: string) => Promise<string>
) {
  return async (id: string): Promise<unknown[]> => {
    const mod = new Module("");
    const code = await loader(join(cwd, id));
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    runInThisContext(Module.wrap(code))(mod.exports, require, mod, "", "");
    return mod.exports as unknown[];
  };
}

export async function getEnvironmentComponent(
  { env, cwd, paths: { component } }: Environment,
  filename: string,
  { loader }: { loader: (id: string) => Promise<string> }
): Promise<unknown[]> {
  if (!env) return [];
  const envs = Array.isArray(env) ? env : [env];
  const envsExistsPairs = await Promise.all(
    envs.map(async (environment) => {
      const path = formatPath(component, {
        component: filename,
        environment,
      });
      return [environment, await pathExists(join(cwd, path))];
    })
  );
  // env => [base, env args]
  // env => [env args]
  // env => ?

  const envsExists = envsExistsPairs
    .reverse()
    .filter(([, exists]) => Boolean(exists));

  if (!envsExists.length) return [];
  const [[legitEnv]] = envsExists;
  if (!legitEnv) return [];

  return tryRequireComponent(
    cwd,
    loader
  )(
    formatPath(component, {
      component: filename,
      environment: legitEnv,
    })
  );
}

export async function koskoMigrateLoader(id: string): Promise<string> {
  return migrateString(readFileSync(id, "utf-8"));
}

// TODO: export to kosko-charts
export async function loadYaml<T>(
  env: Environment,
  path: string
): Promise<T | undefined> {
  const [obj] = await getEnvironmentComponent(env, path, {
    loader: koskoMigrateLoader,
  });
  return obj as T;
}
