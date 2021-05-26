/** Parameters to get a valid `registry/project/image:tag` harbor path */
export interface GithubRegistryImageProps {
  /** name of the docker image */
  name: string;
  /** name of the project */
  project: string;
}

/**
 *
 * This function will return the full path for a given docker image based on `CI_COMMIT_TAG` or `CI_COMMIT_SHA`
 *
 * ```typescript
 * import { getGithubRegistryImagePath } from "@socialgouv/kosko-charts/utils"
 *
 * const imagePath = getGithubRegistryImagePath({
 *   name: "docker-mario",
 *   project: "sre",
 * })
 *
 * ```
 * @category utils
 * @return {string}
 */
export const getGithubRegistryImagePath = ({
  name,
  project,
}: GithubRegistryImageProps): string => {
  const tag = process.env.CI_COMMIT_TAG
    ? process.env.CI_COMMIT_TAG.slice(1)
    : process.env.CI_COMMIT_SHA;

  return `ghcr.io/socialgouv/${project}/${name}:${tag}`;
};
