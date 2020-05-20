import { AppComponentEnvironment } from "./params";

export const matchLabelsFromParams = (
  params: AppComponentEnvironment
): Record<string, string> => ({
  app: params.name,
});
