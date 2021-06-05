import { getGithubRegistryImagePath } from "./getGithubRegistryImagePath";
import { getGitlabRegistryImagePath } from "./getGitlabRegistryImagePath";
import { getHarborImagePath } from "./getHarborImagePath";

/** Parameters to get a valid `registry/project/image:tag` harbor path */
export interface ImagePathProps {
  /** name of the docker image */
  name: string;
  /** name of the harbor project */
  project?: string;
  /** name of the harbor project */
  type?: "ghcr" | "gitlab" | "harbor";
}

/**
 *
 * This function will return the full path for a given docker image based on `CI_COMMIT_TAG` or `CI_COMMIT_SHA`
 *
 * ```typescript
 * import { getHarborImagePath } from "@socialgouv/kosko-charts/utils"
 *
 * const imagePath = getHarborImagePath({
 *   name: "docker-mario",
 *   project: "sre", // defaults to process.env.HARBOR_PROJECT
 *   registry: "chips.registry.com", // defaults to process.env.HARBOR_REGISTRY
 * })
 *
 * ```
 * @category utils
 * @return {string}
 */
export const getImagePath = ({
  name,
  project,
  type = "gitlab",
}: ImagePathProps): string => {
  return type === "harbor"
    ? getHarborImagePath({ name, project })
    : type === "ghcr"
    ? getGithubRegistryImagePath({ name, project })
    : getGitlabRegistryImagePath({ name });
};
