import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/hasura";

const manifests = create({
  config: {
    ingress: false,
  },
  env,
  deployment: {
    imagePullSecrets: [{ name: "regcred" }],
  },
});

export default manifests;
