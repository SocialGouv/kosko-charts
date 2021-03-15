import type { Manifest } from "@kosko/yaml";
import { loadFile } from "@kosko/yaml";
import fs from "fs";
import path from "path";

export const importYamlFolder = async (
  folderPath: string
): Promise<readonly Manifest[]> => {
  if (!fs.existsSync(folderPath)) {
    return [];
  }
  const files = fs.readdirSync(folderPath);
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
