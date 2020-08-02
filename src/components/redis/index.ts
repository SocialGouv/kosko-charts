/* eslint-disable sort-keys */
/* eslint-disable sort-keys-fix/sort-keys-fix */
import { Environment } from "@kosko/env";
import { merge } from "@socialgouv/kosko-charts/utils/merge";
import { ok } from "assert";
import { Deployment } from "kubernetes-models/apps/v1/Deployment";

import { AppConfig, create as createApp } from "../app";

type CreateResult = unknown[];

// todo: persistent volume ?
export const create = (
  // eslint-disable-next-line @typescript-eslint/ban-types
  { env, config = {} }: { env: Environment; config?: Partial<AppConfig> }
): CreateResult => {
  ok(process.env.CI_REGISTRY_IMAGE);
  ok(process.env.CI_ENVIRONMENT_URL);
  ok(process.env.CI_PROJECT_NAME);

  const manifests = createApp("redis", {
    config: merge(
      {
        containerPort: 6379,
        image: "redis:6.0.5-alpine3.12",
        subDomainPrefix: process.env.PRODUCTION ? `redis.` : "redis-",
        ingress: false,
        container: {
          livenessProbe: {
            exec: {
              command: ["sh", "-c", "redis-cli ping"],
            },
          },
          readinessProbe: {
            exec: {
              command: ["sh", "-c", "redis-cli ping"],
            },
          },
          startupProbe: {
            exec: {
              command: ["sh", "-c", "redis-cli ping"],
            },
          },
        },
      },
      config
    ),
    env,
  });

  // DEV: add secret to access DB
  const deployment = manifests.find(
    (manifest): manifest is Deployment => manifest.kind === "Deployment"
  );
  ok(deployment);
  ok(deployment.spec);
  ok(deployment.spec.template.spec);
  ok(deployment.spec.template.spec.containers[0].livenessProbe);
  ok(deployment.spec.template.spec.containers[0].readinessProbe);
  ok(deployment.spec.template.spec.containers[0].startupProbe);
  delete deployment.spec.template.spec.containers[0].livenessProbe.httpGet;
  delete deployment.spec.template.spec.containers[0].readinessProbe.httpGet;
  delete deployment.spec.template.spec.containers[0].startupProbe.httpGet;

  //

  return manifests;
};
