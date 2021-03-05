import { Deployment } from "kubernetes-models/apps/v1/Deployment";

import { addEnvs } from "./addEnvs";

test("should add HELLO and ANSWER variables in deployment env", () => {
  const deployment = new Deployment({
    metadata: { name: "test1" },
    spec: {
      selector: {},
      template: { spec: { containers: [{ name: "container1" }] } },
    },
  });
  addEnvs({ data: { ANSWER: "42", HELLO: "world" }, deployment });
  expect(deployment).toMatchSnapshot();
});
