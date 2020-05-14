import { AppComponentEnvironment } from "@socialgouv/kosko-charts/types";

const env: Partial<AppComponentEnvironment> = {
  name: "www",

  labels: {
    component: "next",
  },

  containerPort: 8080,
  servicePort: 80,
};

export default env;
