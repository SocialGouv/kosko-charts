import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/app";
import { getHarborImagePath } from "@socialgouv/kosko-charts/utils/getHarborImagePath";

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
  },
  deployment: {
    image: getHarborImagePath({ name: "www" }),
    labels: {
      component: "next",
    },
  },
  env,
});

export default manifests;
