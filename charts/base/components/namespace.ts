//

//
// NOTE(douglasduteil): ensure to create the namespace first
// This file starts with `_` to ensure that `kubectl` will run it first.
//

import { Namespace } from "kubernetes-models/v1/Namespace";
import env from "@kosko/env";

const params = env.component("namespace");
const name = params.namespaceName;

const labels = { app: name, ...params.labels };
const metadata = { name, labels, annotations: params.annotations };

//

export const namespace = new Namespace({
  metadata,
});

//

export default [namespace];
