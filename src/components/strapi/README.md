# strapi

Setup a [strapi](https://strapi.io) instance.

Plugged to the default database with a persistent storage attached

## Usage

`components/strapi.ts` :

```js
import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/strapi";

const manifests = create("strapi", {
  env,
});

export default manifests;
```

Your strapi server will be published on `https://strapi-branch-project.fabrique.social.gouv.fr`

## Requirements

### `strapi.sealed-secret.yaml`

| Key | Value |
| --- | ----- |

### `strapi.configmap.yaml`

| Key | Value |
| --- | ----- |

See [all available variables](https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#environment-variables)
