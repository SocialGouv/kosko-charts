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

  // Must start with a letter
  if (!/^[a-z]/.exec(slugified)) slugified = "env-" + slugified;

  // Repeated dashes are invalid
  slugified = slugified.replace(/-{2,}/g, "-");

  // Repeated dashes are invalid (OpenShift limitation)
  if (slugified.length > 24 || slugified !== name) {
    const shortSlug = slugified.slice(0, 16);
    slugified = `${shortSlug}${shortSlug.endsWith("-") ? "" : "-"}${suffix(
      name
    )}`;
  }

  slugified = slugified.replace(/-{2,}/g, "-");

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
