import assert from "assert";

import { addEnvs } from "./addEnvs";
import { Deployment } from "kubernetes-models/apps/v1/Deployment";

test("should add HELLO and ANSWER variables in deployment env", () => {
  const deployment = new Deployment({
    metadata: { name: "test1" },
    spec: {
      selector: {},
      template: { spec: { containers: [{ name: "container1" }] } },
    },
  });
  addEnvs({ deployment, data: { HELLO: "world", ANSWER: 42 } });
  expect(deployment).toMatchSnapshot();
});
