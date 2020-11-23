import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/hasura";

const manifests = create({
  config: {},
  deployment: {
    imagePullSecrets: [{ name: "regcred" }],
  },
  env,
});

export default manifests;
