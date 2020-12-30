import type { Manifest } from "@kosko/generate";
import { loadFile } from "@kosko/yaml";
import fs from "fs";
import path from "path";

export const importYamlFolder = async (
  folderPath: string
): Promise<Manifest[]> => {
  if (!fs.existsSync(folderPath)) {
    return [];
  }
  const files = fs.readdirSync(folderPath);
  return Promise.all(
    files
      .filter((file: string) => /\.ya?ml$/.exec(file))
      .map(async (file: string) =>
        loadFile(path.join(folderPath, file), {
          transform: (manifest: Manifest) => {
            // force namespace on imported ressources
            manifest.metadata.namespace = process.env.KUBE_NAMESPACE;
            return manifest;
          },
        })()
      )
  );
};
