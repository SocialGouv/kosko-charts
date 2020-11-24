import { updateMetadata } from "./updateMetadata";

test("should update metadata", () => {
  const manifest = {
    metadata: { annotations: { oof: "rab" }, labels: { xuq: "zab" } },
    spec: {
      template: {
        metadata: { annotations: { oof: "rab" }, labels: { xuq: "zab" } },
      },
    },
  };
  updateMetadata(manifest, {
    annotations: {
      foo: "bar",
    },
    labels: {
      qux: "baz",
    },
    namespace: { name: "foo" },
  });
  expect(manifest).toMatchInlineSnapshot(`
    Object {
      "metadata": Object {
        "annotations": Object {
          "foo": "bar",
          "oof": "rab",
        },
        "labels": Object {
          "qux": "baz",
          "xuq": "zab",
        },
        "namespace": "foo",
      },
      "spec": Object {
        "template": Object {
          "metadata": Object {
            "annotations": Object {
              "foo": "bar",
              "oof": "rab",
            },
            "labels": Object {
              "qux": "baz",
              "xuq": "zab",
            },
          },
        },
      },
    }
  `);
});

test("should update metadata with default", () => {
  const manifest = {};
  updateMetadata(manifest, {
    namespace: { name: "foo" },
  });
  expect(manifest).toMatchInlineSnapshot(`
    Object {
      "metadata": Object {
        "namespace": "foo",
      },
    }
  `);
});

test("should do nothing if undefined", () => {
  expect(
    updateMetadata(undefined, {
      annotations: {},
      labels: {},
      namespace: { name: "foo" },
    })
  ).toBeUndefined();
});
