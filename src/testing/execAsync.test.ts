import { execAsync } from "./execAsync";

test("should exec and return foo", async () => {
  expect(await execAsync("echo foo")).toMatchInlineSnapshot(`
    Object {
      "stderr": "",
      "stdout": "foo
    ",
    }
  `);
});
