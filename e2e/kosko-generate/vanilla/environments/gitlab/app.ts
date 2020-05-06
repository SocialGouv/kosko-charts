import { default as config } from "@socialgouv/kosko-charts/charts/base/environments/gitlab/global";
import { AppComponentEnvironment } from "@socialgouv/kosko-charts/charts/base/types";

const env: AppComponentEnvironment = {
  ...config,
  name: "no-config",
  imageName: "node",
  imageTag: "12-alpine",
  labels: {
    component: "node",
  },
  containerPort: 8080,
  servicePort: 8080,
};

export default env;
