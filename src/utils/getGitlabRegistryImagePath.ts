import { getProject, getTag } from "./../environments";

/** Parameters to get a valid `registry/project/image:tag` gitlab registry path */
export interface GithubRegistryImageProps {
  /** name of the docker image */
  name: string;
  /** name of the project */
  project?: string;
  /** registry if not `registry.gitlab.factory.social.gouv.fr` */
  registry?: string;
}

/**
 *
 * This function will return the full path for a given docker image based on `CI_COMMIT_TAG` or `CI_COMMIT_SHA`
 *
 * ```typescript
 * import { getGitlabRegistryImagePath } from "@socialgouv/kosko-charts/utils"
 *
 * const imagePath = getGitlabRegistryImagePath({
 *   name: "docker-mario",
 *   project: "sre",
 * })
 *
 * ```
 * @category utils
 * @return {string}
 */
export const getGitlabRegistryImagePath = ({
  name,
  project = getProject(),
  registry = "registry.gitlab.factory.social.gouv.fr",
}: GithubRegistryImageProps): string => {
  return `${registry}/${project}/${name}:${getTag()}`;
};
