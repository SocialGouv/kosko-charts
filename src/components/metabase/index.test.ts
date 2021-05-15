import { Environment } from "@kosko/env";

import { create } from "./index";

jest.mock("@socialgouv/kosko-charts/components/app", () => ({
  create: jest.fn().mockImplementation((...args: unknown[]) => args),
}));

beforeEach(() => {
  jest.resetModules();
});

test("should create metabase dev config", () => {
  const env = new Environment("/tmp");
  const manifest = create({
    env,
  });
  expect(manifest).toMatchSnapshot();
});
