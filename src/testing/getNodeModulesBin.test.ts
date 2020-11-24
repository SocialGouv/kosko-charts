import { join } from "path";

import { getNodeModulesBin } from "./getNodeModulesBin";

test("should exec and return foo", async () => {
  expect(await getNodeModulesBin()).toBe(
    join(process.cwd(), "node_modules", ".bin")
  );
});
