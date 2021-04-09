# netpol Component (network policy)

Add a network policy to protect a given namespace

## Usage


```ts
// in .k8s/components/netpol.ts
import { create } from "@socialgouv/kosko-charts/components/netpol";
import env from "@kosko/env";

const netpol = create("my-namespace")
export default netpol;
```
