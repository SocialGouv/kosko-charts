import {
  NamespaceComponentEnvironment,
  GlobalEnvironment,
} from "@socialgouv/kosko-charts/types";
import { fold } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";
import * as t from "io-ts";
import { NonEmptyString } from "io-ts-types/lib/NonEmptyString";
import { failure } from "io-ts/lib/PathReporter";
import { Namespace } from "kubernetes-models/v1/Namespace";

export type Params = NamespaceComponentEnvironment & GlobalEnvironment;

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

function assertType(params: Params): Partial<Params> | never {
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
