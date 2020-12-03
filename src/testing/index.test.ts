beforeEach(() => {
  jest.resetModules();
});

test("should run 'kosko generate'", async () => {
  const execAsync = jest.fn().mockResolvedValue({ stdout: "execAsync mock" });
  jest.doMock("./execAsync", () => ({
    execAsync,
  }));
  process.env = {};

  const { getEnvManifests } = await import("./index");

  expect(await getEnvManifests()).toEqual("execAsync mock");

  expect(execAsync.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        "npx --no-install kosko generate",
        Object {
          "cwd": "/home/x/zzz/github/SocialGouv/kosko-charts",
          "env": Object {
            "FORCE_COLOR": "0",
          },
        },
      ],
    ]
  `);
});

test("should run 'kosko generate' when empty env", async () => {
  const execAsync = jest.fn().mockResolvedValue({ stdout: "execAsync mock" });
  jest.doMock("./execAsync", () => ({
    execAsync,
  }));
  process.env = {};

  const { getEnvManifests } = await import("./index");

  expect(await getEnvManifests("")).toEqual("execAsync mock");

  expect(execAsync.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        "npx --no-install kosko generate",
        Object {
          "cwd": "/home/x/zzz/github/SocialGouv/kosko-charts",
          "env": Object {
            "FORCE_COLOR": "0",
          },
        },
      ],
    ]
  `);
});
test("should run 'kosko generate --env dev'", async () => {
  const execAsync = jest.fn().mockResolvedValue({ stdout: "execAsync mock" });
  jest.doMock("./execAsync", () => ({
    execAsync,
  }));
  process.env = {};

  const { getEnvManifests } = await import("./index");

  expect(await getEnvManifests("dev")).toEqual("execAsync mock");

  expect(execAsync.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        "npx --no-install kosko generate --env dev",
        Object {
          "cwd": "/home/x/zzz/github/SocialGouv/kosko-charts",
          "env": Object {
            "FORCE_COLOR": "0",
          },
        },
      ],
    ]
  `);
});

test("should run 'kosko generate --env prod'", async () => {
  const execAsync = jest.fn().mockResolvedValue({ stdout: "execAsync mock" });
  jest.doMock("./execAsync", () => ({
    execAsync,
  }));
  process.env = {};

  const { getEnvManifests } = await import("./index");

  expect(await getEnvManifests("prod")).toEqual("execAsync mock");

  expect(execAsync.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        "npx --no-install kosko generate --env prod",
        Object {
          "cwd": "/home/x/zzz/github/SocialGouv/kosko-charts",
          "env": Object {
            "FORCE_COLOR": "0",
          },
        },
      ],
    ]
  `);
});

test('should run "kosko generate --env prod "!(_*)""', async () => {
  const execAsync = jest.fn().mockResolvedValue({ stdout: "execAsync mock" });
  jest.doMock("./execAsync", () => ({
    execAsync,
  }));
  process.env = {};

  const { getEnvManifests } = await import("./index");

  expect(await getEnvManifests("prod", "!(_*)")).toEqual("execAsync mock");

  expect(execAsync.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        "npx --no-install kosko generate --env prod !(_*)",
        Object {
          "cwd": "/home/x/zzz/github/SocialGouv/kosko-charts",
          "env": Object {
            "FORCE_COLOR": "0",
          },
        },
      ],
    ]
  `);
});
