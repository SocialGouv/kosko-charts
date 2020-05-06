//

import { GlobalEnvironment } from "../../types";

const {
  CI_ENVIRONMENT_NAME,
  CI_ENVIRONMENT_SLUG,
  CI_PROJECT_NAME,
  CI_PROJECT_PATH_SLUG,
  KUBE_INGRESS_BASE_DOMAIN,
  KUBE_NAMESPACE,
} = process.env;

const isProductionCluster = CI_ENVIRONMENT_NAME.endsWith("prod");

const env: GlobalEnvironment = {
  namespaceName: KUBE_NAMESPACE,
  //
  domain: KUBE_INGRESS_BASE_DOMAIN,
  subdomainSeparator: isProductionCluster ? "." : "-",
  subdomain: isProductionCluster
    ? CI_PROJECT_NAME
    : `${CI_ENVIRONMENT_SLUG}-${CI_PROJECT_NAME}`,
  //
  annotations: {
    "app.gitlab.com/app": CI_PROJECT_PATH_SLUG,
    "app.gitlab.com/env": CI_ENVIRONMENT_SLUG,
  },
  labels: {
    application: CI_PROJECT_NAME,
    owner: CI_PROJECT_NAME,
    team: CI_PROJECT_NAME,
  },
};

export default env;
