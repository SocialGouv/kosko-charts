import fs from "fs";
import { loadFile } from "@kosko/yaml";
import path from "path";

export const importYamlFolder = (folderPath: string) => {
  if (!fs.existsSync(folderPath)) {
    return [];
  }
  const files = fs.readdirSync(folderPath);
  return files
    .filter((file: string) => /\.ya?ml$/.exec(file))
    .map((file: string) =>
      loadFile(path.join(folderPath, file), {
        transform: (manifest: any) => {
          // force namespace on imported ressources
          manifest.metadata.namespace = process.env.KUBE_NAMESPACE;
          return manifest;
        },
      })()
    );
};
