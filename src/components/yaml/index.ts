import type { Manifest } from "@kosko/yaml";
import { loadFile } from "@kosko/yaml";
import { pathExists, readdir } from "fs-extra";
import path from "path";

export const importYamlFolder = async (
  folderPath: string
): Promise<readonly Manifest[]> => {
  if (!(await pathExists(folderPath))) {
    return [];
  }
  const files = await readdir(folderPath);
  const manifests = await Promise.all(
    files
      .filter((file: string) => /\.ya?ml$/.exec(file))
      .flatMap(async (file) =>
        loadFile(path.join(folderPath, file), {
          transform(manifest: Manifest) {
            manifest.metadata.namespace = process.env.KUBE_NAMESPACE;
            return manifest;
          },
        })()
      )
  );
  return manifests.flat();
};
