# PG Component

## Usage

Ensure secret containing random secure password for db exists

```ts
// in .k8s/components/create-db-secret.ts
import createDbSecretJob from "@socialgouv/kosko-charts/components/pg/create-db-secret.job";

const job = createDbSecretJob()
export default [job];
```

Create db and user using password from secret

```ts
// in .k8s/components/create-db-user.ts
import createDbUserJob from "@socialgouv/kosko-charts/components/pg/create-db-user.job";

const job = createDbUserJob()
export default [job];
```
