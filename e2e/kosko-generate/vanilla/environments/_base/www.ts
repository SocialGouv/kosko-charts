import { AppComponentEnvironment } from "@socialgouv/kosko-charts/components/app/params";

const env: AppComponentEnvironment = {
  containerPort: 8080,

  image: {
    name: process.env.CI_REGISTRY_IMAGE,
    tag: process.env.CI_COMMIT_TAG
      ? process.env.CI_COMMIT_TAG.slice(1)
      : process.env.CI_COMMIT_SHA,
  },

  labels: {
    component: "next",
  },

  name: "www",
  servicePort: 80,
};

export default env;
