//

export interface MetadataEntries {
  annotations?: Record<string, string>;
  labels?: Record<string, string>;
}

export interface NamespaceComponentEnvironment extends MetadataEntries {
  namespace: { name: string };
  rancherId?: string;
  git: { branch?: string; remote?: string };
}

export interface GlobalEnvironment extends NamespaceComponentEnvironment {
  domain: string;
  ingress?: {
    annotations?: Record<string, string | undefined>;
  };
  subdomain: string;
}

export interface NamedComponentEnvironment {
  name: string;
}

export interface CIEnv {
  isPreProduction: boolean;
  isProduction: boolean;
  metadata: GlobalEnvironment;
  projectName: string;
  shortSha: string;
}
