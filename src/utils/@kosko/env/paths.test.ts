//

// HACK(douglasduteil): wrap internal @kosko/env/dist/paths.js
// Ensure that the wrapped code
// Copied from https://github.com/tommy351/kosko/blob/%40kosko/env%400.5.2/packages/env/src/__tests__/paths.ts

import { formatPath } from "./paths";

test("works", () => {
  expect(formatPath("a/#{b}/c/#{d}", { b: "foo", d: "bar" })).toEqual(
    "a/foo/c/bar"
  );
});
