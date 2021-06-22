
import { Ingress } from "kubernetes-models/networking.k8s.io/v1beta1/Ingress";

export const addIngressAnnotations = (ingress: Ingress, annotations: Record<string, string>): Ingress => {
  /* pass dynamic deployment URL as env var to the container */
  if (annotations) {
    if (!ingress.metadata) {
      ingress.metadata = { annotations: {} };
    }
    ingress.metadata.annotations = {
      ...(ingress.metadata.annotations || {}),
      ...annotations,
    };
  }
  return ingress;
};
