//
// Inspired by https://github.com/gitlabhq/gitlabhq/blob/v13.6.1/lib/gitlab/slug/environment.rb#L19-L39
//

import { createHash } from "crypto";
import slugify from "slugify";

//

slugify.extend({ ".": "-", "/": "-", "@": "-", _: "-", "~": "-" });

//

export function generate(name: string): string {
  // Lowercase letters and numbers only
  let slugified = slugify(name, {
    lower: true,
  });
  // see https://gist.github.com/codeguy/6684588#gistcomment-3361909
  // .normalize("NFD") // split an accented letter in the base letter and the acent
  // .replace(/[\u0300-\u036f]/g, "") // remove all previously split accents
  // .toLowerCase()
  // .trim()
  // .replace(/[^a-z0-9 ]/g, "-") // remove all chars not letters, numbers and spaces (to be replaced)
  // .replace(/\s+/g, "-"); // separator

  // Must start with a letter
  if (!/^[a-z]/.exec(slugified)) slugified = "env-" + slugified;

  // Repeated dashes are invalid
  slugified = slugified.replace(/-{2,}/g, "-");

  // Repeated dashes are invalid (OpenShift limitation)
  slugified =
    slugified.length > 24 || slugified != name
      ? shortenAndAddSuffix(slugified)
      : slugified.replace(/-$/, "");

  return slugified;
}

export function shortenAndAddSuffix(name: string): string {
  const slug = name.slice(0, 16);
  return `${slug}${slug.endsWith("-") ? "" : "-"}${suffix(name)}`;
}

// Slugifying a name may remove the uniqueness guarantee afforded by it being
// based on name (which must be unique). To compensate, we add a predictable
// 6-byte suffix in those circumstances. This is not *guaranteed* uniqueness,
// but the chance of collisions is vanishingly small
function suffix(name: string): string {
  const hex = Buffer.from(
    createHash("sha256").update(name).digest("hex")
  ).toString();

  return parseInt(hex, 16).toString(36).slice(0, 6);
}
