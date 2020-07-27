import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/app";

const manifests = create("www", {
  config: {
    containerPort: 8080,
    image: "",
    labels: {
      component: "next",
    },
    limits: {
      cpu: "50m",
      memory: "128Mi",
    },
    requests: {
      cpu: "1m",
      memory: "64Mi",
    },
  },
  env,
});

export default manifests;
