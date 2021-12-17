# oauth2-proxy

Add a [oauth2-proxy](https://oauth2-proxy.github.io/oauth2-proxy/) instance in front of your application.

## Usage

`components/oauth2-proxy.ts` :

This creates an oauth2-proxy to http://app:80

```js
import { create } from "@socialgouv/kosko-charts/components/oauth2-proxy";

const manifests = create({
  upstream: "http://app:80",
});

export default manifests;
```

:warning: Be sure to disable your main application ingress so the proxy can handle it.

## Requirements

The secrets and configuration should reside in :

- `environments/[env]/oauth2-proxy-configmap.yml`
- `environments/[env]/oauth2-proxy-sealed-secret.yml`

### `oauth2-proxy-configmap.yml`

Define public environment variables from https://oauth2-proxy.github.io/oauth2-proxy/docs/configuration/overview

### `oauth2-proxy-sealed-secret.yml`

Define secret environment variables from https://oauth2-proxy.github.io/oauth2-proxy/docs/configuration/overview
