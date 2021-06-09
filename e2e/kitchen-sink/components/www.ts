import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/app";
import { createAutoscale } from "@socialgouv/kosko-charts/components/autoscale";
import { getDeployment } from "@socialgouv/kosko-charts/utils";

const asyncManifests = create("www", {
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

export default async (): Promise<{ kind: string }[]> => {
  const manifests = await asyncManifests;
  const deployment = getDeployment(manifests);
  const hpa = createAutoscale(deployment);
  return [...manifests, hpa];
};
