import { AppComponentEnvironment } from "../../types";

export default {
  imageTag: process.env.CI_COMMIT_SHA,
  imageName: process.env.CI_REGISTRY_IMAGE,
} as Readonly<AppComponentEnvironment>;
