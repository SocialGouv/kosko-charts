import { importYamlFolder } from "./importYamlFolder";
import fs from "fs";

jest.mock("fs");

const getYaml = (path: string) => `
kind: Ingress
apiVersion: extensions/v1beta1
metadata:
  name: mock
  path: ${path}
`;

test("should load manifests fom /yaml folder", async () => {
  process.env.KUBE_NAMESPACE = "some-namespace";
  fs.existsSync.mockReturnValue(true);
  fs.readdirSync.mockReturnValue(["file1.ts", "file2.yaml", "file3.yml"]);
  fs.readFile.mockImplementation((path, _, callback) =>
    callback(null, Buffer.from(getYaml(path)))
  );

  // loadString.mockReturnValue(sampleYaml);
  const manifests = await Promise.all(importYamlFolder("/tmp/yaml"));
  expect(manifests).toMatchSnapshot();
});
