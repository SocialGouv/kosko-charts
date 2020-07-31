import { getPgServerHostname } from "./getPgServerHostname";

test("should succeed validating a valid value", () => {
  expect(getPgServerHostname("sample-Next-App123", "preprod")).toStrictEqual(
    "samplenextapp123devserver.postgres.database.azure.com"
  );
});
