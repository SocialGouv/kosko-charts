import { EnvVar } from "kubernetes-models/v1/EnvVar";

import { restoreContainerJob } from "./restore-container.job";

process.env.CI_COMMIT_SHORT_SHA = "b123a99";

test("should create restore DB job", () => {
  expect(
    restoreContainerJob({
      project: "some-cool-project",
      env: [
        new EnvVar({
          name: "SOURCE_CONNECTION_STRING",
          value:
            "DefaultEndpointsProtocol=https;AccountName=coolprod;AccountKey=SomeKey;EndpointSuffix=core.windows.net",
        }),
        new EnvVar({
          name: "SOURCE_CONTAINER",
          value: "source-container",
        }),
        new EnvVar({
          name: "DESTINATION_CONNECTION_STRING",
          value:
            "DefaultEndpointsProtocol=https;AccountName=cooldev;AccountKey=SomeOtherKey;EndpointSuffix=core.windows.net",
        }),
        new EnvVar({
          name: "DESTINATION_CONTAINER",
          value: "destination-container",
        }),
      ],
    })
  ).toMatchSnapshot();
});
