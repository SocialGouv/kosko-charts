export const matchLabelsFromParams = (params: {
  name: string;
}): Record<string, string> => ({
  app: params.name,
});
