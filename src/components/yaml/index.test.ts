import { remove, writeFile } from "fs-extra";
import { join } from "path";
import { directory } from "tempy";

import { importYamlFolder } from "./index";

//

// PERF(dougalduteil): mock slow internal @kosko/require
// As the @kosko/yaml uses @kosko/require to get the correct yaml constructor
// Mocking it increase the test steep and the test stablitiy
jest.mock("@kosko/require");

//

const getYaml = (path: string) => `
kind: Ingress
apiVersion: extensions/v1beta1
metadata:
  name: mock
  path: ${path}
`;

let tempDir = "";

beforeEach(async () => {
  tempDir = directory({ prefix: `kosko-chart-test-` });
  await writeFile(join(tempDir, "file1.ts"), "// /tmp/yaml/file1.ts");
  await writeFile(join(tempDir, "file2.yaml"), getYaml("/tmp/yaml/file2.yaml"));
  await writeFile(join(tempDir, "file3.yml"), getYaml("/tmp/yaml/file3.yml"));
});
afterEach(async () => {
  await remove(tempDir);
});
test("should load manifests fom /yaml folder", async () => {
  process.env.KUBE_NAMESPACE = "some-namespace";
  const manifests = await importYamlFolder(tempDir);
  expect(manifests).toMatchSnapshot();
});
