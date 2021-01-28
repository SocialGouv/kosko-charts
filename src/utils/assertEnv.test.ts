import { assertEnv } from "./assertEnv";

test("should assert FOO variable in env", () => {
  const assert = assertEnv(["FOO"]);
  expect(() => {
    assert({ FOO: "BAR" });
  }).not.toThrow();
});

test("fails as FOO variable unset", () => {
  const assert = assertEnv(["FOO"]);
  expect(assert).toThrowErrorMatchingInlineSnapshot(`
    "Wrong environment variables
    required \\"FOO\\": \\"undefined\\" should be defined
    "
  `);
});

test("fails as FOO variable is not a string", () => {
  const assert = assertEnv(["FOO"]);
  expect(() => {
    assert({ FOO: (42 as unknown) as string });
  }).toThrowErrorMatchingInlineSnapshot(`
    "Wrong environment variables
    required \\"FOO\\": \\"42\\" should be string
    "
  `);
});

test("fails as FOO variable is an empty string", () => {
  const assert = assertEnv(["FOO"]);
  expect(() => {
    assert({ FOO: " " });
  }).toThrowErrorMatchingInlineSnapshot(`
    "Wrong environment variables
    required \\"FOO\\": \\" \\" should not be an empty string
    "
  `);
});

test("should assert nothing", () => {
  const assert = assertEnv([]);
  expect(assert).not.toThrow();
});

test("fails as FOO and BAR variable unset", () => {
  const assert = assertEnv(["FOO", "BAR"]);
  expect(assert).toThrowErrorMatchingInlineSnapshot(`
    "Wrong environment variables
    required \\"FOO\\": \\"undefined\\" should be defined
    required \\"BAR\\": \\"undefined\\" should be defined
    "
  `);
});
