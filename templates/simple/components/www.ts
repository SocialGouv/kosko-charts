import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/app";

const manifests = create("app", {
  config: {
    containerPort: 3030,
    image: "",
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
