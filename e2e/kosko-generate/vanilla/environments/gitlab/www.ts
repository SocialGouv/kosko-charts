import { AppComponentEnvironment } from "@socialgouv/kosko-charts/components/app/params";

const env: Partial<AppComponentEnvironment> = {
  image: {
    name: process.env.CI_REGISTRY_IMAGE,
    tag: process.env.CI_COMMIT_SHA,
  },
};

export default env;
