import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/hasura";

const manifests = create({
  config: {},
  deployment: {},
  env,
});

export default manifests;
