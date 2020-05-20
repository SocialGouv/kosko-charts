import { Decoder, refinement, string } from "io-ts/lib/Decoder";

export const NonEmptyString: Decoder<string> = refinement(
  string,
  (s: unknown): s is string => typeof s === "string" && s.length > 0,
  "NonEmptyString"
);
