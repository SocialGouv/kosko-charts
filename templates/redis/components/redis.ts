import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/redis";

const manifests = create({
  env,
});

export default manifests;
