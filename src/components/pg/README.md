# PG Component

## Usage

Create db and user using password from secret

```ts
// in .k8s/components/create-db-user.ts
import createDbUserJob from "@socialgouv/kosko-charts/components/pg/create-db-user.job";
import environments from "@socialgouv/kosko-charts/environments";

const ciEnv = environments(process.env);
const pgPasswordSecretKeyRef = ciEnv.isProduction
  ? `azure-pg-user`
  : ciEnv.isPreProduction
  ? `azure-pg-user-preprod`
  : `azure-pg-user-${ciEnv.branchSlug}`;
  
const job = createDbUserJob({
  ciEnv,
  pgPasswordSecretKeyRef,
});

export default [job];
```
