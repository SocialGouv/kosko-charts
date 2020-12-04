import { waitForHttp } from "./waitForHttp";

test("should succeed validating a valid value", () => {
  expect(
    waitForHttp({ name: "some-service", url: "http://service:4242" })
  ).toMatchSnapshot();
});
