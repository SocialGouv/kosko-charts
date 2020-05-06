import type { NamespaceComponentEnvironment } from "../../types";

const env: NamespaceComponentEnvironment = {
  enabled: true,
  annotations: {
    "field.cattle.io/projectId": process.env.RANCHER_PROJECT_ID,
  },
  labels: {
    cert: "wildcard",
  },
};

export default env;
