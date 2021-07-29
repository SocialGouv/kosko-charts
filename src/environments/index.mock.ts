import type { CIEnv } from "@socialgouv/kosko-charts/types";

export default (): CIEnv => ({
  environment: "my-test",
  isPreProduction: false,
  isProduction: false,
  metadata: {
    annotations: {
      "app.gitlab.com/app": "socialgouv-sample",
      "app.gitlab.com/env": "my-test",
    },
    domain: "domain",
    git: {},
    labels: {
      application: "sample",
      owner: "sample",
      team: "sample",
    },
    namespace: { name: "sample-42-my-test" },
    subdomain: "subdomain",
  },
  projectName: "sample",
  registry: "registry",
  sha: "0123456789abcdefghijklmnopqrstuvwxyz0123",
  shortSha: "0123456",
});
