import { generate } from "./environmentSlug";

test.concurrent.each`
name | expected
${""} | ${"env-43gao4"}
${"a"} | ${"a"}
${"A"} | ${"a-51rzzs"}
${"foo"} | ${"foo"}
${" foo"} | ${"foo-13m58g"}
${"-foo"} | ${"foo-13m58g"}
${".foo"} | ${"env-foo-30b7ar"}
${"_foo"} | ${"env-foo-30b7ar"}
${"/foo"} | ${"env-foo-30b7ar"}
${"//foo"} | ${"env-foo-30b7ar"}
${"bar"} | ${"bar"}
${"bar "} | ${"bar-6avzi6"}
${"bar-"} | ${"bar-6avzi6"}
${"bar."} | ${"bar-3p5jxr"}
${"bar_"} | ${"bar-3p5jxr"}
${"bar//"} | ${"bar-3p5jxr"}
${"42"} | ${"env-42-69um1o"}
${"42-foo"} | ${"env-42-foo-1wgih0"}
${"42-foo/bar-42"} | ${"env-42-foo-bar-4-3k4xn2"}
${"foo bar"} | ${"foo-bar-34n246"}
${"foo  bar"} | ${"foo-bar-34n246"}
${"foo - bar"} | ${"foo-bar-34n246"}
${"foo -bar"} | ${"foo-bar-34n246"}
${"foo- bar"} | ${"foo-bar-34n246"}
${"foo-bar"} | ${"foo-bar"}
${"foo_bar"} | ${"foo-bar-34n246"}
${"foo/bar"} | ${"foo-bar-34n246"}
${"foo~bar"} | ${"foo-bar-34n246"}
${"foo@bar"} | ${"foo-bar-34n246"}
...
${"master"} | ${"master"}
${"alpha"} | ${"alpha"}
${"beta"} | ${"beta"}
${"next"} | ${"next"}
${"v0.0.0"} | ${"v0-0-0-3juiz4"}
${"v0.0.1"} | ${"v0-0-1-53ptvv"}
${"v0.1.1"} | ${"v0-1-1-1g556e"}
${"v1.1.1"} | ${"v1-1-1-55k9zo"}
...
${"renovate/socialgouvdocker-images"} | ${"renovate-socialg-1colh5"}
`(
  "returns $expected env slug for branch $name",
  ({ name, expected }: { name: string; expected: string }) => {
    expect(generate(name)).toBe(expected);
  }
);
