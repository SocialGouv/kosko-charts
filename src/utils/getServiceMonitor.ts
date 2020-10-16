import { ServiceMonitor } from "@kubernetes-models/prometheus-operator/monitoring.coreos.com/v1/ServiceMonitor";

export interface ServiceMonitorParams {
  path?: string;
  interval?: string;
  port?: string;
  namespace: string;
  appName: string;
}

export const getServiceMonitor = ({
  path = "/metrics",
  interval = "1h",
  port = "http",
  namespace,
  appName,
}: ServiceMonitorParams): ServiceMonitor => {
  const monitor = new ServiceMonitor({
    metadata: {
      labels: {
        app: appName,
      },
      name: `${appName}-monitor`,
      namespace,
    },
    spec: {
      endpoints: [
        {
          path,
          port,
          interval,
        },
      ],
      namespaceSelector: {
        matchNames: [namespace],
      },
      selector: {
        matchLabels: {
          app: appName,
        },
      },
    },
  });
  return monitor;
};
