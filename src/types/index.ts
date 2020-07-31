//

export interface GlobalEnvironment {
  annotations?: Record<string, string>;
  domain: string;
  ingress?: {
    annotations?: Record<string, string | undefined>;
  };
  git: { branch?: string; remote?: string };
  labels?: Record<string, string>;
  namespace: { name: string };
  rancherId?: string;
  subdomain: string;
}

export interface NamedComponentEnvironment {
  name: string;
}

export interface NamespaceComponentEnvironment {
  annotations?: Record<string, string>;
  labels?: Record<string, string>;
}
