import { Deployment } from "kubernetes-models/apps/v1/Deployment";

import { addInitContainerCommand } from "./addInitContainerCommand";

test("should addInitContainerCommand default to deployment", () => {
  const deployment = new Deployment({
    spec: {
      selector: { matchLabels: { component: "app" } },
      template: {
        spec: {
          containers: [
            {
              image: "test:42",
              name: "some-container",
            },
          ],
        },
      },
    },
  });
  addInitContainerCommand(deployment, { args: ["init-db"], command: ["yarn"] });
  expect(deployment).toMatchSnapshot();
});

test("should fail when no command specified", () => {
  const deployment = new Deployment({
    spec: {
      selector: { matchLabels: { component: "app" } },
      template: {
        spec: {
          containers: [
            {
              image: "test:42",
              name: "some-container",
            },
          ],
        },
      },
    },
  });

  expect(() => {
    addInitContainerCommand(deployment, {
      name: "failing",
    });
  }).toThrow();
});
