import { AppComponentEnvironment } from "@socialgouv/kosko-charts/components/app/params";

const env: AppComponentEnvironment = {
  containerPort: 8080,

  image: {
    name: "node",
    tag: "12-alpine",
  },

  labels: {
    component: "next",
  },

  name: "www",
  servicePort: 80,
};

export default env;
