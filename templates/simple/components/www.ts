import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/app";

const manifests = create("www", {
  config: {
    container: {
      resources: {
        limits: {
          cpu: "50m",
          memory: "128Mi",
        },
        requests: {
          cpu: "1m",
          memory: "64Mi",
        },
      },
    },
    containerPort: 8080,
    withPostgres: true,
    withRedirections: {
      destination: "www.website.fr",
      hosts: ["website.fr", "old-website.com"],
    },
  },
  deployment: {
    imagePullSecrets: [
      {
        name: "some-secret",
      },
    ],
    labels: {
      component: "next",
    },
  },
  env,
});

export default manifests;
