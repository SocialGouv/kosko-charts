/* eslint-disable jest/no-export */
/* eslint-disable jest/no-done-callback */
/* eslint-disable jest/expect-expect */

// import {} from "@socialgouv/kosko-charts/testing";

// import { generate } from "@kosko/generate";

import type { Assert, TestResult } from "zora";

export default async ({ test }: Assert): Promise<TestResult> => {
  return test("should preprod greet", (t) => {
    t.ok(true, "hello world");
  });
};
