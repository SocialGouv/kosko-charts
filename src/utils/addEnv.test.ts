import assert from "assert";

import { addEnv } from "./addEnv";
import { Deployment } from "kubernetes-models/apps/v1/Deployment";
import { EnvVar } from "kubernetes-models/v1/EnvVar";

test("should assert FOO variable in env", () => {
  const deployment = new Deployment({
    metadata: { name: "test1" },
    spec: {
      selector: {},
      template: { spec: { containers: [{ name: "container1" }] } },
    },
  });
  addEnv({ deployment, data: new EnvVar({ name: "HELLO", value: "world" }) });
  expect(deployment).toMatchSnapshot();
});
