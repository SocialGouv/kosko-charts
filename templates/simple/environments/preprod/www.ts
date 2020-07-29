import { AppConfig } from "@socialgouv/kosko-charts/components/app";
import { ok } from "assert";

ok(process.env.KUBE_INGRESS_BASE_DOMAIN);
ok(process.env.CI_PROJECT_NAME);
export default {
  labels: {
    application: `preprod-${process.env.CI_PROJECT_NAME}`,
  },
  subdomain: `preprod-${process.env.CI_PROJECT_NAME}`,
} as Partial<AppConfig>;
