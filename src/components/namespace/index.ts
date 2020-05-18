import { fold } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";
import * as t from "io-ts";
import { NonEmptyString } from "io-ts-types/lib/NonEmptyString";
import { failure } from "io-ts/lib/PathReporter";
import { Namespace } from "kubernetes-models/v1/Namespace";

import {
  NamespaceComponentEnvironment,
  GlobalEnvironment,
} from "@socialgouv/kosko-charts/types";

export type Params = NamespaceComponentEnvironment & GlobalEnvironment;

function assertType(params: Params): Partial<Params> | never {
  /* eslint-disable @typescript-eslint/unbound-method */
  return pipe(
    params,
    t.type(
      {
        namespace: t.type({
          name: NonEmptyString,
        }),
      },
      "NamespaceComponentParams"
    ).decode,
    fold(
      (errors) => {
        throw new Error(
          [
            "Invalid config provided:",
            "- " + failure(errors).join("\n- ").replace(/\//g, "."),
          ].join("\n")
        );
      },
      (_) => _
    )
  );
}

export const create = (params: Params): { namespace: Namespace } => {
  assertType(params);
  const name = params.namespace.name;
  return {
    namespace: new Namespace({
      metadata: {
        name,
        labels: { app: name, ...params.labels },
        annotations: params.annotations,
      },
    }),
  };
};
