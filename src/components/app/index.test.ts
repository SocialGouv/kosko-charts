import { merge } from "@kosko/env/dist/merge";

import {
  GlobalEnvironment,
  AppComponentEnvironment,
} from "@socialgouv/kosko-charts/types";

import { create, Params } from "./index";

test("should throw because of missing variables", () => {
  expect(create).toThrowErrorMatchingSnapshot();
});

test("should throw because the containerPort is not an integer", () => {
  expect(() =>
    create({
      containerPort: 1234.56789,
      image: { name: "image_name", tag: "image_tag" },
    } as Params)
  ).toThrowErrorMatchingSnapshot();
});

test("should return a deployment, an ingress and service ", () => {
  const params: Partial<Params> = {
    containerPort: 1234,
    servicePort: 5678,
    domain: "fabrique.social.gouv.fr",
    name: "app_name",
    image: { name: "image_name", tag: "image_tag" },
    namespace: { name: "namespace_name" },
    subdomain: "sample",
  };
  expect(create(params as Params)).toMatchSnapshot();
});

test("should return the models with global params in it", () => {
  const global: Partial<GlobalEnvironment> = {
    annotations: {
      "app.gitlab.com/app": "socialgouv-sample",
      "app.gitlab.com/env": "my-test",
    },
    domain: "fabrique.social.gouv.fr",
    ingress: {
      annotations: {
        "kubernetes.io/tls-acme": undefined,
        "certmanager.k8s.io/cluster-issuer": undefined,
      },
      secretName: "wildcard-crt",
    },
    labels: {
      team: "sample",
      application: "sample",
      owner: "sample",
    },
    namespace: { name: "sample-42-my-test" },
    subdomain: "sample",
  };
  const params: Partial<AppComponentEnvironment> = {
    containerPort: 1234,
    servicePort: 5678,
    image: { name: "image_name", tag: "image_tag" },
    name: "app_name",
    subdomain: "my.sample",
    ingress: {
      secretName: "sample-crt",
    },
  };
  expect(create(merge(global, params) as Params)).toMatchSnapshot();
});
