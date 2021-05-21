import type { Manifest } from "@kosko/yaml";
import { loadString } from "@kosko/yaml";

const getYaml = (path: string) => `
kind: Ingress
apiVersion: extensions/v1beta1
metadata:
  name: mock
  path: ${path}
`;

beforeEach(() => {
  jest.clearAllMocks();
});
test("should load manifests fom /yaml folder", async () => {
  process.env.KUBE_NAMESPACE = "some-namespace";

  jest.doMock("fs", () => ({
    existsSync: jest.fn().mockReturnValue(true),
    readdirSync: jest
      .fn()
      .mockReturnValue(["file1.ts", "file2.yaml", "file3.yml"]),
  }));
  jest.doMock("@kosko/yaml", () => ({
    loadFile: async (
      file: string,
      { transform }: { transform: (manifest: Manifest) => Manifest }
    ) =>
      jest.fn().mockResolvedValueOnce(transform((await loadString(getYaml(file)))[0])),
  }));
  const { importYamlFolder } = await import(".");
  const manifests = await importYamlFolder("/tmp/yaml");
  expect(manifests).toMatchSnapshot();
});
