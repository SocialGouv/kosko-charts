/** Parameters to get a valid `registry/project/image:tag` harbor path */
export interface HarborProjectImageProps {
  /** name of the docker image */
  name: string;
  /** name of the harbor project */
  project?: string;
  /** registry if not `harbor.fabrique.social.gouv.fr` */
  registry?: string;
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
export const getHarborImagePath = ({
  name,
  registry = process.env.HARBOR_REGISTRY ?? "harbor.fabrique.social.gouv.fr",
  project = process.env.HARBOR_PROJECT,
}: HarborProjectImageProps): string => {
  let tag = process.env.CI_COMMIT_TAG
    ? process.env.CI_COMMIT_TAG.slice(1)
    : process.env.CI_COMMIT_SHA;

  if (process.env.SOCIALGOUV_BASE_DOMAIN) {
    tag =
      process.env.GITHUB_REF && process.env.GITHUB_REF.startsWith("refs/tags/")
        ? (process.env.GITHUB_REF.split("/").pop() ?? "").substring(1)
        : `sha-${process.env.GITHUB_SHA}`;
  }

  return `${registry}/${project}/${name}:${tag}`;
};
