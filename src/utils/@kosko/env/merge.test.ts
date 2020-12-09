//

// HACK(douglasduteil): wrap internal @kosko/env/dist/merge.js
// Ensure that the wrapped code
// Copied from https://github.com/tommy351/kosko/blob/%40kosko/env%401.0.1/packages/env/src/__tests__/merge.ts

import { merge } from "./merge";

describe("nested objects", () => {
  test("should merge objects", () => {
    const actual = merge(
      {
        bar: 1,
        foo: {
          bar: 3,
        },
      },
      {
        baz: 2,
        foo: {
          baz: 4,
        },
      }
    );

    expect(actual).toEqual({
      bar: 1,
      baz: 2,
      foo: {
        bar: 3,
        baz: 4,
      },
    });
  });
});

describe("array", () => {
  test("should override the value", () => {
    const actual = merge({ a: [1] }, { a: [2] });
    expect(actual).toEqual({ a: [2] });
  });
});

describe("non-plain objects", () => {
  // eslint-disable-next-line @typescript-eslint/no-extraneous-class
  class Props {
    constructor(props: Record<string, unknown>) {
      for (const key of Object.keys(props)) {
        (this as Record<string, unknown>)[key] = props[key];
      }
    }
  }

  test("should override the value", () => {
    const actual = merge(
      {
        a: new Props({ bar: 2, foo: 1 }),
      },
      {
        a: new Props({ foo: 3 }),
      }
    );

    expect(actual).toEqual({ a: new Props({ foo: 3 }) });
  });
});

describe("rest parameters", () => {
  test("should merge them all", () => {
    const actual = merge({ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 });

    expect(actual).toEqual({
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    });
  });
});
