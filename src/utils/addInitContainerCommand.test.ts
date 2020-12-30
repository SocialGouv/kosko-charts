import { Deployment } from "kubernetes-models/apps/v1/Deployment";

import { addInitContainerCommand } from "./addInitContainerCommand";

test("should addInitContainerCommand to deployment", () => {
  const deployment = new Deployment({
    spec: {
      template: {
        spec: {
          containers: [
            {
              image: "test:42",
            },
          ],
        },
      },
    },
  });
  addInitContainerCommand(deployment, {
    args: ["migrate-db"],
    command: ["yarn"],
  });
  expect(deployment).toMatchSnapshot();
});
