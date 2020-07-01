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

export interface BaseCreateDbJobParameters {
  database: string;
  user: string;
  password: string;
  extensions?: string;
}

export interface CreateDbJobParameters
  extends NamedComponentEnvironment,
    BaseCreateDbJobParameters {}

interface GetDevDababaseParameters {
  suffix?: string;
}

// default dev values
export function getDevDatabaseParameters({
  suffix,
}: GetDevDababaseParameters): BaseCreateDbJobParameters {
  return {
    database: `autodevops_${suffix}`,
    password: `password_${suffix}`,
    user: `user_${suffix}`,
  };
}
export function getProdDatabaseParameters(): BaseCreateDbJobParameters {
  return {
    database: "production_db",
    password: "production_password",
    user: "production_user",
  };
}

export type Params = CreateDbJobParameters & GlobalEnvironment;
