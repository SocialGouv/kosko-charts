import type { Environment } from "@kosko/env";
import { loadFile } from "@kosko/yaml";
import type {
  AppConfig,
  CreateFnDeploymentArgs,
} from "@socialgouv/kosko-charts/components/app";
import { create as createApp } from "@socialgouv/kosko-charts/components/app";
import { azureProjectVolume } from "@socialgouv/kosko-charts/components/azure-storage/azureProjectVolume";
import { addEnvs, getIngressHost } from "@socialgouv/kosko-charts/utils";
import { merge } from "@socialgouv/kosko-charts/utils/@kosko/env/merge";
import { getDeployment } from "@socialgouv/kosko-charts/utils/getDeployment";
import {
  Probe,
  ResourceRequirements,
  Volume,
  VolumeMount,
} from "kubernetes-models/v1";

type StrapiAppConfig = Partial<AppConfig>;

export interface CreateFnArgs {
  env: Environment;
  config?: StrapiAppConfig;
  deployment?: CreateFnDeploymentArgs;
}
export type CreateFn = (
  name: string,
  { env, config, deployment: deploymentParams }: CreateFnArgs
) => Promise<{ kind: string }[]>;

const prob = new Probe({
  httpGet: {
    path: "/_health",
    port: "http",
  },
  initialDelaySeconds: 30,
});

const resources = new ResourceRequirements({
  limits: {
    cpu: "1",
    memory: "1Gi",
  },
  requests: {
    cpu: "300m",
    memory: "256Mi",
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
    name: volumeName,
    persistentVolumeClaim: persistentVolumeClaim.metadata?.name
      ? {
          claimName: persistentVolumeClaim.metadata.name,
        }
      : undefined,
  });

  const emptyDir = new Volume({ emptyDir: {}, name: volumeName });

  const uploadsVolumeMount = new VolumeMount({
    mountPath: "/app/public/uploads",
    name: volumeName,
  });

  // generate basic strapi manifests
  const manifests = await createApp(name, {
    config: strapiConfig,
    deployment: {
      ...deployment,
      container: {
        livenessProbe: prob,
        readinessProbe: prob,
        resources,
        startupProbe: prob,
        volumeMounts: [uploadsVolumeMount],
      },
      volumes: [ephemeralVolume ? emptyDir : uploadsVolume],
    },
    env,
  });

  const strapiDeployment = getDeployment(manifests);
  const backofficeUrl = "https://" + getIngressHost(manifests);

  addEnvs({
    data: {
      BACKOFFICE_URL: backofficeUrl,
      DATABASE_CLIENT: "postgres",
      DATABASE_HOST: "$(PGHOST)",
      DATABASE_NAME: "$(PGDATABASE)",
      DATABASE_PASSWORD: "$(PGPASSWORD)",
      DATABASE_PORT: "$(PGPORT)",
      DATABASE_SSL: "true",
      DATABASE_USERNAME: "$(PGUSER)",
    },
    deployment: strapiDeployment,
  });

  const azureVolume = await loadFile(
    `environments/${env.env}/azure-volume.sealed-secret.yaml`
  )().catch(() => []);

  return manifests
    .concat(azureVolume)
    .concat(ephemeralVolume ? [] : [persistentVolumeClaim, persistentVolume]);
};
