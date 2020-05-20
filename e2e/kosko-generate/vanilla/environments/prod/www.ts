import { GlobalEnvironment } from "@socialgouv/kosko-charts/types";

export default {
  ingress: {
    subdomain: `prod-${process.env.CI_PROJECT_NAME as string}`,
  },
} as Partial<GlobalEnvironment>;
