import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/hasura";

const manifests = create({
  config: {
    image: "hasura/graphql-engine:latest",
    ingress: true,
  },
  deployment: {},
  env,
});

export default manifests;
