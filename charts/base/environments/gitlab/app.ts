import { AppComponentEnvironment } from "../../types";

export default {
  imageTag: process.env.CI_COMMIT_SHA,
  imageName: process.env.CI_REGISTRY_IMAGE,
  containerPort: 8080,
  servicePort: 8080,
} as Readonly<AppComponentEnvironment>;
