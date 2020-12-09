import { project } from "./gitlab-ci.env";

test("should generate foo gitlab project env", () => {
  const { base, dev, preprod, prod } = project("sample");

  expect(base).toMatchSnapshot("base");
  expect(dev).toMatchSnapshot("dev");
  expect(preprod).toMatchSnapshot("preprod");
  expect(prod).toMatchSnapshot("prod");
});
