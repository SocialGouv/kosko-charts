import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/hasura";

const manifests = create({
  config: {
    ingress: false,
  },
  deployment: {
    imagePullSecrets: [{ name: "regcred" }],
  },
  env,
});

export default manifests;
