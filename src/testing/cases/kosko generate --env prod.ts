//

import { getEnvManifests } from "../index";

test("kosko generate --prod", async () => {
  expect(await getEnvManifests("prod")).toMatchSnapshot();
});
