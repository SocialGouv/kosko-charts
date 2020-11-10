import { getDevDatabaseParameters } from "@socialgouv/kosko-charts/components/azure-pg/params";
import { addInitContainer } from "@socialgouv/kosko-charts/utils/addInitContainer";
import { ok } from "assert";
import { IIoK8sApiCoreV1Container } from "kubernetes-models/_definitions/IoK8sApiCoreV1Container";
import { Deployment } from "kubernetes-models/apps/v1/Deployment";

interface AllPrepareCommandArgs extends IIoK8sApiCoreV1Container {
  sql: string;
  database: string;
}

type PrepareCommandArgs = Omit<AllPrepareCommandArgs, "name">;

// type PrepareCommandArgs = IIoK8sApiCoreV1Container & { sql: string, props: };

const prepareDbContainer = ({
  database,
  sql,
  ...props
}: PrepareCommandArgs): IIoK8sApiCoreV1Container => ({
  command: ["psql", "--dbname", database, "-c", sql],
  image: "postgres:10",
  imagePullPolicy: "IfNotPresent",
  name: "prepare-db",
  resources: {
    limits: {
      cpu: "300m",
      memory: "256Mi",
    },
    requests: {
      cpu: "100m",
      memory: "64Mi",
    },
  },
  ...props,
});

export const addPrepareDbInitContainer = (
  deployment: Deployment
): Deployment => {
  ok(process.env.CI_COMMIT_SHORT_SHA);
  const databaseParameters = getDevDatabaseParameters({
    suffix: process.env.CI_COMMIT_SHORT_SHA,
  });
  const initContainer = prepareDbContainer({
    database: databaseParameters.database,
    envFrom: [
      {
        secretRef: {
          name: `azure-pg-admin-user`,
        },
      },
    ],
    sql: "SELECT VERSION();",
  });

  addInitContainer(deployment, initContainer);

  return deployment;
};
