/* eslint-disable jest/no-export */
/* eslint-disable jest/no-done-callback */
/* eslint-disable jest/expect-expect */

// import {} from "@socialgouv/kosko-charts/testing";

import env from "@kosko/env";
import { generate } from "@kosko/generate";
import { join } from "path";
import snapshot from "snap-shot-core";
import type { Assert, TestResult } from "zora";

console.log(snapshot);
export default async ({ test }: Assert): Promise<TestResult> => {
  env.env = "dev";
  return test("should dev greet", async (t) => {
    console.log(env.cwd);
    const result = await generate({
      components: ["*"],
      path: join(env.cwd, "../components"),
    });
    t.equal(result.manifests, []);
  });
};
