//

import { getEnvManifests } from "../index";

jest.setTimeout(1000 * 60);
test("kosko generate --preprod", async () => {
  expect(await getEnvManifests("preprod")).toMatchSnapshot();
});
