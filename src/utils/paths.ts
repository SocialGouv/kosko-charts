//copy from https://github.com/tommy351/kosko/blob/master/packages/env/src/paths.ts

const rTemplate = /#\{(\w+)\}/g;

export interface Paths {
  global: string;
  component: string;
}

export function formatPath(path: string, data: Record<string, string>): string {
  return path.replace(rTemplate, (s, key) => {
    return data[key] || s;
  });
}
