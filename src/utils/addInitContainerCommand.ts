import { addInitContainer } from "@socialgouv/kosko-charts/utils/addInitContainer";
import { ok } from "assert";
import type { Deployment } from "kubernetes-models/apps/v1/Deployment";
import { Container } from "kubernetes-models/v1/Container";

import { merge } from "./@kosko/env/merge";

export const addInitContainerCommand = (
  deployment: Deployment,
  container: Partial<Container>
) => {
  ok(deployment.spec);
  ok(deployment.spec.template);
  ok(deployment.spec.template.spec);
  ok(container);
  ok(container.command);
  ok(container.command.length);
  const image = deployment.spec.template.spec.containers[0].image;
  const initContainer = new Container(
    merge(
      {
        args: [],
        command: container.command,
        image,
        imagePullPolicy: "Always",
        name: "init",
        resources: {
          limits: {
            cpu: "500m",
            memory: "512Mi",
          },
          requests: {
            cpu: "100m",
            memory: "128Mi",
          },
        },
      },
      container
    )
  );

  addInitContainer(deployment, initContainer);

  return deployment;
};
