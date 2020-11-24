import { execAsync } from "./execAsync";

export async function getNodeModulesBin(): Promise<string> {
  const { stdout } = await execAsync("yarn bin", {
    env: { FORCE_COLOR: "0" },
  });
  return stdout.trim();
}
