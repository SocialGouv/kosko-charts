import { Decoder, number, refinement } from "io-ts/lib/Decoder";

export const Integer: Decoder<number> = refinement(
  number,
  (n: unknown): n is number => typeof n === "number" && Number.isInteger(n),
  "Integer"
);
