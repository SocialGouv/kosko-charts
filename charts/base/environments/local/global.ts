//

import { GlobalEnvironment } from "../../types";

const you = process.env.USERNAME || process.env.USER || "toto";
const prefix = you.toLowerCase();

const env: GlobalEnvironment = {
  namespaceName: `cdtn-veille-git-localhost-${prefix}`,
  //
  domain: process.env.KUBE_INGRESS_BASE_DOMAIN || "dev.fabrique.social.gouv.fr",
  subdomain: `${prefix}-localhost-cdtn-veille-git`,
  subdomainSeparator: "-",
};

export default env;
