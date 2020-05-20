import { GlobalEnvironment } from "@socialgouv/kosko-charts/types";
import { Integer } from "@socialgouv/kosko-charts/utils/Integer";
import { NonEmptyString } from "@socialgouv/kosko-charts/utils/NonEmptyString";
import * as D from "io-ts/lib/Decoder";

export const AppComponentParams = D.intersection(
  D.type({
    containerPort: Integer,
    image: D.type({
      name: NonEmptyString,
      tag: NonEmptyString,
    }),
    name: D.string,
    namespace: D.type({
      name: NonEmptyString,
    }),
    servicePort: Integer,
  }),
  D.partial({
    labels: D.record(D.string),
    limits: D.type({ cpu: D.string, memory: D.string }),
    requests: D.type({ cpu: D.string, memory: D.string }),
  })
);

export type AppComponentEnvironment = D.TypeOf<typeof AppComponentParams>;
export type Params = AppComponentEnvironment & GlobalEnvironment;
