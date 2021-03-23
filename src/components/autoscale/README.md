# Autoscale Component

## Usage

```ts
// in .k8s/components/foo.ts
import { Deployment } from "kubernetes-models/apps/v1/Deployment";
import { createAutoscale } from "@socialgouv/kosko-charts/components/autoscale";

const deployment = new Deployment({
  metadata: {
    name: "foo",
    namespace: "foo-namespace",
  },
});

const hpa = createAutoscale(deployment);

export default [deployment, hpa];
```

Will output :

```yaml
---
apiVersion: autoscaling/v2beta2
kind: HorizontalPodAutoscaler
metadata:
  name: foo
  namespace: foo-namespace
spec:
  maxReplicas: 10
  metrics:
  - resource:
      name: cpu
      target:
        averageUtilization: 50
        type: Utilization
    resource:
      name: memory
      target:
        averageUtilization: 50
        type: Utilization
    type: Resource
  minReplicas: 1
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: foo
```

You can customize spec :

```ts
// in .k8s/components/foo.ts
import { Deployment } from "kubernetes-models/apps/v1/Deployment";
import { createAutoscale } from "@socialgouv/kosko-charts/components/autoscale";

const deployment = new Deployment({
  metadata: {
    name: "foo",
    namespace: "foo-namespace",
  },
});

const hpa = createAutoscale(deployment, {
  maxReplicas: 4,
  metrics: [
    {
      resource: {
        name: "cpu",
        target: {
          averageUtilization: 50,
          type: "Utilization",
        },
      },
      type: "Resource",
    },
  ],
  minReplicas: 2,
});

export default [deployment, hpa];
```
