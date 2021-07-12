import { createIngress } from "./createIngress";

test("should create a dev ingress", () => {
  expect(
    createIngress({
      hosts: ["sample.dev2.fabrique.social.gouv.fr"],
      isProduction: false,
      name: "my-ingress",
    })
  ).toMatchSnapshot();
});

test("should create a prod ingress", () => {
  expect(
    createIngress({
      hosts: ["sample.dev2.fabrique.social.gouv.fr"],
      isProduction: true,
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
      isProduction: false,
      name: "my-ingress",
      serviceName: "www",
      servicePort: 80,
    })
  ).toMatchSnapshot();
});
