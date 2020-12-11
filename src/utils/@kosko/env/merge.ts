//

/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

// HACK(douglasduteil): wrap internal @kosko/env/dist/merge.js
// As the paths API is internal (not exported) in @kosko/env
// This is code will wrap and expose it for our needs.
// see https://github.com/tommy351/kosko/blob/%40kosko/env%401.0.1/packages/env/src/merge.ts#L12-L18
// since https://github.com/tommy351/kosko/commit/6353c8559994b826c8056ad03a35332e88b9134a

// https://stackoverflow.com/a/48769843
type UnionToIntersection<T> = (T extends any ? (k: T) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

export const merge: <T extends any[]>(
  ...data: T
) => UnionToIntersection<T[number]> =
  // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
  require("@kosko/env/dist/merge.js").merge;
