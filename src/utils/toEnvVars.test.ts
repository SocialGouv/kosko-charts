import { toEnvVars } from "./toEnvVars";

test("should convert to EnvVar array", () => {
  expect(
    toEnvVars({
      NODE_ENV: "production",
      hello: "42",
    })
  ).toMatchSnapshot();
});
