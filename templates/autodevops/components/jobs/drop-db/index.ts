import { dropDbJob } from "@socialgouv/kosko-charts/components/azure-pg/drop-db.job";
import { getDevDatabaseParameters } from "@socialgouv/kosko-charts/components/azure-pg/params";
import environments from "@socialgouv/kosko-charts/environments";

const ciEnv = environments(process.env);

const pgParams = getDevDatabaseParameters({ suffix: ciEnv.environment });

export default dropDbJob(pgParams);
