import type { Environment } from "@kosko/env";
import gitlab from "@socialgouv/kosko-charts/environments/gitlab";
import type {
  AppConfig,
  CreateFnDeploymentArgs,
} from "@socialgouv/kosko-charts/components/app";
import { create as createApp } from "@socialgouv/kosko-charts/components/app";
import { addEnvs } from "@socialgouv/kosko-charts/utils";
import { merge } from "@socialgouv/kosko-charts/utils/@kosko/env/merge";
import type { Deployment } from "kubernetes-models/api/apps/v1/Deployment";
import { PersistentVolumeClaim } from "kubernetes-models/v1/PersistentVolumeClaim";

//

interface StrapiAppConfig extends Partial<AppConfig> {
  pvcName?: string;
}

export interface CreateFnArgs {
  env: Environment;
  config?: StrapiAppConfig;
  deployment?: CreateFnDeploymentArgs;
}
export type CreateFn = (
  name: string,
  { env, config, deployment: deploymentParams }: CreateFnArgs
) => Promise<{ kind: string }[]>;

export const create: CreateFn = async (name, { env, config, deployment }) => {
  const manifests = [];

  const gitlabEnv = gitlab(process.env);

  const strapiConfig = merge(
    {
      containerPort: 1337,
      pvcName: "strapi-uploads",
      subDomainPrefix: "strapi-",
      withPostgres: true,
    },
    config ?? {}
  );

  const deploymentConfig = merge(
    {
      container: {
        // override probes path
        livenessProbe: {
          httpGet: {
            path: "/_health",
            port: "http",
          },
        },
        readinessProbe: {
          httpGet: {
            path: "/_health",
            port: "http",
          },
        },
        resources: {
          limits: {
            cpu: "500m",
            memory: "512Mi",
          },
          requests: {
            cpu: "50m",
            memory: "256Mi",
          },
        },
        // increase startup delay
        startupProbe: {
          httpGet: {
            path: "/_health",
            port: "http",
          },
        },
        volumeMounts: [
          {
            mountPath: "/app/public/uploads",
            name: "uploads",
          },
        ],
      },
    },
    deployment ?? {}
  );

  const strapiManifests = await createApp(name, {
    config: strapiConfig,
    deployment: deploymentConfig,
    env,
  });

  const strapiDeployment = strapiManifests.find(
    (m) => m.kind === "Deployment"
  ) as Deployment;

  const projectName = process.env.CI_PROJECT_NAME;
  const pvcName = strapiConfig.pvcName || `${projectName}-strapi-uploads`;

  if (strapiDeployment.spec?.template.spec) {
    strapiDeployment.spec.template.spec.volumes = [
      {
        name: "uploads",
        persistentVolumeClaim: {
          claimName: pvcName,
        },
      },
    ];
  }

  const pvc = new PersistentVolumeClaim({
    metadata: {
      annotations: {},
      name: pvcName,
    },
    spec: {
      accessModes: ["ReadWriteOnce"],
      resources: {
        requests: {
          storage: "5Gi",
        },
      },
      volumeMode: "Filesystem",
    },
  });

  addEnvs({
    data: {
      BACKOFFICE_URL: `https://${strapiConfig.subDomainPrefix}${gitlabEnv.subdomain}.${gitlabEnv.domain}`,
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

  manifests.push(...strapiManifests);
  manifests.push(pvc);

  return manifests;
};
