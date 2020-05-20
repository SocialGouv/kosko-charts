import { GlobalEnvironment } from "@socialgouv/kosko-charts/types";

export default {
  subdomain: `prod-${process.env.CI_PROJECT_NAME as string}`,
} as Partial<GlobalEnvironment>;
