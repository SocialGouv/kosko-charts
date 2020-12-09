import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/nginx";

const manifests = create("www", { config: { image: "nginx:latest" }, env });

export default manifests;
