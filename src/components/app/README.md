# App Component

Almost all other kosko-charts deployments components use this base component under-the-hood.

This component generates kube manifests and appropriate gitlab metadata based on current GIT environment :

 - deployment
 - service
 - ingress

## Usage

Import the default app component template.

```ts
// in .k8s/components/app.ts
import { create } from "@socialgouv/kosko-charts/components/app";
import env from "@kosko/env";

const manifests = create("app", {
 env,
 config: {
   image: "nginx:latest"
 }
});

export default manifests;
```

You can customize it

```ts
// in .k8s/components/app.ts
import { create } from "@socialgouv/kosko-charts/components/app";
import { getHarborImagePath } from "@socialgouv/kosko-charts/utils/getHarborImagePath";
import env from "@kosko/env";

const manifests = create("app", {
 env,
 config: {
   image: getHarborImagePath({name:"image-app"}),
   containerPort: 3000,
   subdomain: "force-subdomain",
   // enable ingress or not
   ingress: true;
   // attach a DATABASE_URL
   withPostgres: false
   // add seconddary hostnames
   withRedirections: {
     hosts: ["test.com", "www2.test.com"],
     destination: "www.test.com"
   }
 },
 
});

export default manifests;
```

## Environment

Files at `environments/[env]/[app].configmap.yaml` and `environments/[env]/[app].sealed-secret.yaml` will be automatically imported into the container environment variables.
