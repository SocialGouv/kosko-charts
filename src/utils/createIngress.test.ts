import createIngress from "./createIngress";

beforeEach(() => {
  delete process.env.PRODUCTION;
});

test("should create a dev ingress", () => {
  expect(
    createIngress({
      hosts: ["sample.dev2.fabrique.social.gouv.fr"],
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
      hosts: ["sample.dev2.fabrique.social.gouv.fr"],
      name: "my-ingress",
      serviceName: "www",
      servicePort: 80,
    })
  ).toMatchSnapshot();
});

test("should create an ingress with multiple hosts", () => {
  expect(
    createIngress({
      hosts: [
        "sample.dev2.fabrique.social.gouv.fr",
        "www.sample.dev2.fabrique.social.gouv.fr",
      ],
      name: "my-ingress",
      serviceName: "www",
      servicePort: 80,
    })
  ).toMatchSnapshot();
});
