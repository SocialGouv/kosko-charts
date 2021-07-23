import type { Environment } from "@kosko/env";
import { loadFile } from "@kosko/yaml";
import {
  VolumeMount,
  Probe,
  ResourceRequirements,
  Volume,
} from "kubernetes-models/v1";

import type {
  AppConfig,
  CreateFnDeploymentArgs,
} from "@socialgouv/kosko-charts/components/app";
import { create as createApp } from "@socialgouv/kosko-charts/components/app";
import { addEnvs, getIngressHost } from "@socialgouv/kosko-charts/utils";
import { merge } from "@socialgouv/kosko-charts/utils/@kosko/env/merge";
import { getDeployment } from "@socialgouv/kosko-charts/utils/getDeployment";
import { azureProjectVolume } from "@socialgouv/kosko-charts/components/azure-storage/azureProjectVolume";

interface StrapiAppConfig extends Partial<AppConfig> {}

export interface CreateFnArgs {
  env: Environment;
  config?: StrapiAppConfig;
  deployment?: CreateFnDeploymentArgs;
}
export type CreateFn = (
  name: string,
  { env, config, deployment: deploymentParams }: CreateFnArgs
) => Promise<{ kind: string }[]>;

const getGithubRef = (env: Record<string, any>) => {
  const ref =
    env.GITHUB_REF && env.GITHUB_REF.startsWith("refs/tags/")
      ? env.GITHUB_REF.split("/").pop()
      : `sha-${env.GITHUB_SHA}`;
  return ref;
};

const prob = new Probe({
  httpGet: {
    path: "/_health",
    port: "http",
  },
  initialDelaySeconds: 30,
});

const resources = new ResourceRequirements({
  requests: {
    cpu: "300m",
    memory: "256Mi",
  },
  limits: {
    cpu: "1",
    memory: "1Gi",
  },
});

//
export const create: CreateFn = async (name, { env, config, deployment }) => {
  //const manifests = [];

  const volumeName = "uploads";
  const ephemeralVolume = env.env !== "prod" && env.env !== "preprod";

  const strapiConfig = merge(
    {
      containerPort: 1337,
      subDomainPrefix: "strapi-",
      withPostgres: true,
    },
    config ?? {}
  );

  const [persistentVolumeClaim, persistentVolume] = azureProjectVolume(
    volumeName,
    {
      storage: "5Gi",
    }
  );

  const uploadsVolume = new Volume({
    persistentVolumeClaim: { claimName: persistentVolumeClaim.metadata!.name! },
    name: volumeName,
  });

  const emptyDir = new Volume({ name: volumeName, emptyDir: {} });

  const uploadsVolumeMount = new VolumeMount({
    mountPath: "/app/public/uploads",
    name: volumeName,
  });

  // generate basic strapi manifests
  const manifests = await createApp(name, {
    env,
    config: strapiConfig,
    deployment: {
      container: {
        livenessProbe: prob,
        readinessProbe: prob,
        startupProbe: prob,
        resources,
        volumeMounts: [uploadsVolumeMount],
      },
      volumes: [ephemeralVolume ? emptyDir : uploadsVolume],
    },
  });

  const strapiDeployment = getDeployment(manifests);
  const backofficeUrl = "https://" + getIngressHost(manifests);

  addEnvs({
    deployment: strapiDeployment,
    data: {
      BACKOFFICE_URL: backofficeUrl,
      DATABASE_CLIENT: "postgres",
      DATABASE_NAME: "$(PGDATABASE)",
      DATABASE_HOST: "$(PGHOST)",
      DATABASE_PORT: "$(PGPORT)",
      DATABASE_USERNAME: "$(PGUSER)",
      DATABASE_PASSWORD: "$(PGPASSWORD)",
      DATABASE_SSL: "true",
    },
  });

  const azureVolume = await loadFile(
    `environments/${env.env}/azure-volume.sealed-secret.yaml`
  )().catch(() => []);

  return manifests
    .concat(azureVolume as any)
    .concat(ephemeralVolume ? [] : [persistentVolumeClaim, persistentVolume]);
};
