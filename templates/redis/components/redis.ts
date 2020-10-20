import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/redis";

const manifests = create("redis", {
  env,
});

export default manifests;
