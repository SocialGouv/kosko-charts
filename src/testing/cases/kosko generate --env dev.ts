//

import { getEnvManifests } from "../index";

test("kosko generate --dev", async () => {
  expect(await getEnvManifests("dev")).toMatchSnapshot();
});
