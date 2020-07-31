import createIngress from "./createIngress";

test("should create a dev ingress", () => {
  expect(
    createIngress({
      host: "sample.dev.fabrique.social.gouv.fr",
      name: "my-ingress",
      serviceName: "www",
      servicePort: 80,
    })
  ).toMatchSnapshot();
});

test("should create a prod ingress", () => {
  process.env.PRODUCTION = "true";
  expect(
    createIngress({
      host: "sample.dev.fabrique.social.gouv.fr",
      name: "my-ingress",
      serviceName: "www",
      servicePort: 80,
    })
  ).toMatchSnapshot();
});
