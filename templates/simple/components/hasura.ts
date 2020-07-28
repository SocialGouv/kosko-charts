/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */
import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/hasura";

const manifests = create({
  env,
  config: {},
});

export default manifests;
