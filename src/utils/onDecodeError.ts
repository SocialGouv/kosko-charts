import { drawForest } from "fp-ts/lib/Tree";
import { DecodeError } from "io-ts/lib/Decoder";

export const onDecodeError = (errorForest: DecodeError): never => {
  throw new Error(["BadArgument:", drawForest(errorForest)].join(""));
};
