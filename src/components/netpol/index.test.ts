//

beforeEach(() => {
  jest.resetModules();
});

test("should create a network policy", async () => {
  const { create } = await import("./index");
  const netpol = create("some-app");
  expect(netpol).toMatchSnapshot();
});
