import {
  GlobalEnvironment,
  NamedComponentEnvironment,
} from "@socialgouv/kosko-charts/types";
import { NonEmptyString } from "@socialgouv/kosko-charts/utils/NonEmptyString";
import * as D from "io-ts/lib/Decoder";

export const CreateDbComponentParams = D.intersection(
  D.type({
    database: NonEmptyString,
    password: NonEmptyString,
    user: NonEmptyString,
  }),
  D.partial({
    extensions: NonEmptyString,
  })
);

export interface CreateDbJobParameters extends NamedComponentEnvironment {
  database: string;
  user: string;
  password: string;
  extensions?: string;
}

export type Params = CreateDbJobParameters & GlobalEnvironment;
