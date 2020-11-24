//

import { getEnvManifests } from "../index";

test("kosko generate --preprod", async () => {
  expect(await getEnvManifests("preprod")).toMatchSnapshot();
});
