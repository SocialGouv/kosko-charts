import { rmdirSync, writeFileSync } from "fs";
import { join } from "path";
import { directory } from "tempy";

import { importYamlFolder } from "./index";

const getYaml = (path: string) => `
kind: Ingress
apiVersion: extensions/v1beta1
metadata:
  name: mock
  path: ${path}
`;

let tempDir = "";

beforeEach(() => {
  tempDir = directory({ prefix: `kosko-chart-test-` });
  writeFileSync(join(tempDir, "file1.ts"), "// /tmp/yaml/file1.ts");
  writeFileSync(join(tempDir, "file2.yaml"), getYaml("/tmp/yaml/file2.yaml"));
  writeFileSync(join(tempDir, "file3.yml"), getYaml("/tmp/yaml/file3.yml"));
});
afterEach(() => {
  rmdirSync(tempDir, { recursive: true });
});
test("should load manifests fom /yaml folder", async () => {
  process.env.KUBE_NAMESPACE = "some-namespace";
  const manifests = await importYamlFolder(tempDir);
  expect(manifests).toMatchSnapshot();
});
