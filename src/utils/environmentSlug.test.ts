import { generate } from "./environmentSlug";

test.concurrent.each`
name | expected
${""} | ${"env-5oaq0b"}
${" "} | ${"env-1d1ppf"}
${"a"} | ${"a"}
${"A"} | ${"a-24t5zj"}
${"foo"} | ${"foo"}
${" foo"} | ${"foo-519jbe"}
${"-foo"} | ${"foo-48rrcc"}
${".foo"} | ${"env-foo-13scql"}
${"_foo"} | ${"env-foo-276ax5"}
${"/foo"} | ${"env-foo-2ry66a"}
${"//foo"} | ${"env-foo-49jdu9"}
${"bar"} | ${"bar"}
${"bar "} | ${"bar-3bd9i7"}
${"bar-"} | ${"bar-3p5jxr"}
${"bar."} | ${"bar-3odd94"}
${"bar_"} | ${"bar-3zwwso"}
${"bar//"} | ${"bar-51rfpg"}
${"42"} | ${"env-42-2vfnyo"}
${"42-foo"} | ${"env-42-foo-2rkzi7"}
${"42-foo/bar-42"} | ${"env-42-foo-bar-4-47yjnm"}
${"foo bar"} | ${"foo-bar-69w36b"}
${"foo  bar"} | ${"foo-bar-3dj5tm"}
${"foo - bar"} | ${"foo-bar-21zv3j"}
${"foo -bar"} | ${"foo-bar-ftlsyn"}
${"foo- bar"} | ${"foo-bar-202h7o"}
${"foo-bar"} | ${"foo-bar"}
${"foo_bar"} | ${"foo-bar-1tn5ds"}
${"foo/bar"} | ${"foo-bar-53d979"}
${"foo~bar"} | ${"foo-bar-63gi2v"}
${"foo@bar"} | ${"foo-bar-5v88ns"}
...
${"master"} | ${"master"}
${"alpha"} | ${"alpha"}
${"beta"} | ${"beta"}
${"next"} | ${"next"}
${"v0.0.0"} | ${"v0-0-0-4svh1v"}
${"v0.0.1"} | ${"v0-0-1-4cg10t"}
${"v0.1.1"} | ${"v0-1-1-21ni6m"}
${"v1.1.1"} | ${"v1-1-1-3k7de0"}
...
${"renovate/socialgouvdocker-images"} | ${"renovate-socialg-1e66b4"}
`(
  "'$name' 's slug should be '$expected'",
  ({ name, expected }: { name: string; expected: string }) => {
    expect(generate(name)).toBe(expected);
  }
);
