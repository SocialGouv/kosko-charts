//

import { join } from "path";

// HACK(douglasduteil): wrap internal @kosko/env/dist/paths.js
// As the paths API is internal (not exported) in @kosko/env
// This is code will wrap and expose it for our needs.
// see https://github.com/tommy351/kosko/blob/%40kosko/env%400.5.2/packages/env/src/paths.ts#L9-L13
// since https://github.com/tommy351/kosko/commit/6353c8559994b826c8056ad03a35332e88b9134a

export const formatPath: (
  path: string,
  data: Record<string, unknown>
) => string =
  // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
  require(join(require.resolve("@kosko/env"), "../paths.js")).formatPath;
