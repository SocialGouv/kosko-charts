import {
  GlobalEnvironment,
  NamedComponentEnvironment,
} from "@socialgouv/kosko-charts/types";
import { NonEmptyString } from "@socialgouv/kosko-charts/utils/NonEmptyString";
import * as D from "io-ts/lib/Decoder";

export const PostresSecretParameters = D.intersection(
  D.type({
    database: NonEmptyString,
    host: NonEmptyString,
    password: NonEmptyString,
    user: NonEmptyString,
  }),
  D.partial({
    sslmode: NonEmptyString,
  })
);

export interface PostresSecretParameters extends NamedComponentEnvironment {
  database: string;
  user: string;
  password: string;
  host: string;
  sslmode?: string;
}

export type Params = PostresSecretParameters & GlobalEnvironment;
