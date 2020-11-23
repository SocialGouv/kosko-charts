import type { Environment } from "@kosko/env";
import { migrateString } from "@kosko/migrate";
import { existsSync, readFileSync } from "fs";
import { Module } from "module";
import { join } from "path";
import { runInThisContext } from "vm";

import { formatPath } from "./@kosko/env/paths";

export function tryRequireComponent(
  cwd: string,
  loader: (id: string) => string
) {
  return (id: string): unknown[] => {
    const mod = new Module("");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    runInThisContext(Module.wrap(loader(join(cwd, id))))(
      mod.exports,
      require,
      mod,
      "",
      ""
    );
    return mod.exports as unknown[];
  };
}

export function getEnvironmentComponent(
  { env, cwd, paths: { component } }: Environment,
  filename: string,
  { loader }: { loader: (id: string) => string }
): unknown[] {
  if (!env) return [];
  const envs = Array.isArray(env) ? env : [env];
  // env => [base, env args]
  // env => [env args]
  // env => ?
  const legitEnv = envs.reverse().find((environment) => {
    const path = formatPath(component, {
      component: filename,
      environment,
    });
    return existsSync(join(cwd, path));
  });

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

export function koskoMigrateLoader(id: string): string {
  return migrateString(readFileSync(id, "utf-8"));
}

// TODO: export to kosko-charts
export function loadYaml<T>(env: Environment, path: string): T | undefined {
  const [obj] = getEnvironmentComponent(env, path, {
    loader: koskoMigrateLoader,
  });
  return obj as T;
}
