//

import { getEnvManifests } from "../index";

jest.setTimeout(1000 * 60);
test("kosko generate --prod", async () => {
  expect(await getEnvManifests("prod")).toMatchSnapshot();
});
