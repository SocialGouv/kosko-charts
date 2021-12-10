import environmentMock from "@socialgouv/kosko-charts/environments/index.mock";

beforeEach(() => {
  jest.resetModules();
});

test("should create a network policy with custom namespace", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);
  const { create } = await import("./index");
  const netpol = create("some-app");
  expect(netpol).toMatchSnapshot();
});

test("should create a network policy", async () => {
  jest.doMock("@socialgouv/kosko-charts/environments", () => environmentMock);
  const { create } = await import("./index");
  const netpol = create();
  expect(netpol).toMatchSnapshot();
});
