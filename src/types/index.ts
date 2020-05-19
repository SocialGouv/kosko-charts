//

export interface GlobalEnvironment {
  annotations?: Record<string, string>;
  domain: string;
  ingress?: {
    annotations?: Record<string, string | undefined>;
    secretName?: string;
  };
  labels?: Record<string, string>;
  namespace: {
    name: string;
  };
  subdomain: string;
}

export interface AppComponentEnvironment {
  containerPort: number;
  image: { name: string; tag: string };
  ingress?: { secretName?: string };
  labels?: Record<string, string>;
  limits?: { cpu: string; memory: string };
  name: string;
  requests?: { cpu: string; memory: string };
  servicePort: number;
  subdomain?: string;
}

export interface NamespaceComponentEnvironment {
  annotations?: Record<string, string>;
  labels?: Record<string, string>;
}
