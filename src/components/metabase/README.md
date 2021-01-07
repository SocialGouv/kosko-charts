# metabase

Setup a [metabase](https://metabase.com) instance.

Once setup, you can plug various databases from the UI and explore the data, share dashboards...

Note: Metabase need its own PG database as backend to persist its configuration.

## Usage

`components/metabase.ts` :

```js
import env from "@kosko/env";
import { create } from "@socialgouv/kosko-charts/components/metabase";

const manifests = create({
  env,
});

export default manifests;
```

Your metabase server will be published on `https://metabase-branch-project.fabrique.social.gouv.fr`

## Requirements

### `metabase.sealed-secret.yaml`

| Key                        | Value                                                                                                                          |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `MB_DB_CONNECTION_URI`     | Metabase PG string `postgresql://plop.postgres.database.azure.com/metabase?ssl=require&user=metabase%40plop&password=somepass` |
| `MB_ENCRYPTION_SECRET_KEY` | Metabase internal encryption key                                                                                               |

### `metabase.configmap.yaml`

| Key                      | Value                                                     |
| ------------------------ | --------------------------------------------------------- |
| MB_ADMIN_EMAIL           | admin@fabrique.social.gouv.fr                             |
| MB_ANON_TRACKING_ENABLED | "false"                                                   |
| MB_APPLICATION_LOGO_URL  | https://socialgouv.github.io/support/_media/marianne.jpeg |
| MB_APPLICATION_NAME      | metabase-xxx                                              |
| MB_DB_TYPE               | postgres                                                  |
| MB_EMAIL_FROM_ADDRESS    | admin@fabrique.social.gouv.fr                             |
| MB_ENABLE_EMBEDDING      | "true"                                                    |
| MB_ENABLE_PUBLIC_SHARING | "true"                                                    |
| MB_SITE_LOCALE           | fr                                                        |
| MB_SITE_NAME             | Fabrique des ministères sociaux                           |

See [all available variables](https://metabase.com/docs/latest/operations-guide/environment-variables.html)
