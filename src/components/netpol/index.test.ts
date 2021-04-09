//

beforeEach(() => {
  jest.resetModules();
});

test("should create a network policy", async () => {
  jest.doMock(
    "@socialgouv/kosko-charts/environments/gitlab",
    () => gitlabModuleMock
  );

  const { create } = await import("./index");
  const netpol = create("some-app");
  expect(netpol).toMatchSnapshot();
});
