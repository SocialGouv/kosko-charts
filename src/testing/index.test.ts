import type { config as configFn } from "dotenv";

import type { execAsync as execAsyncFn } from "./execAsync";

const dotenvModule = jest.createMockFromModule<{
  config: jest.MockedFunction<typeof configFn>;
}>("dotenv");
const execAsyncModule = jest.createMockFromModule<{
  execAsync: jest.MockedFunction<typeof execAsyncFn>;
}>("./execAsync");

beforeEach(() => {
  jest.doMock("dotenv", () => dotenvModule);

  jest.doMock("./execAsync", () => execAsyncModule);

  process.env = {};
  process.cwd = jest.fn().mockReturnValue("/");

  //

  jest.clearAllMocks();
});

test("should run 'kosko generate'", async () => {
  execAsyncModule.execAsync.mockResolvedValue({
    stderr: "",
    stdout: "execAsync mock",
  });
  dotenvModule.config.mockReturnValue({});

  const { getEnvManifests } = await import("./index");

  expect(await getEnvManifests()).toEqual("execAsync mock");

  expect(execAsyncModule.execAsync.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        "npx --no-install kosko generate",
        Object {
          "cwd": "/",
          "env": Object {
            "FORCE_COLOR": "0",
          },
        },
      ],
    ]
  `);
  expect(dotenvModule.config.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        Object {
          "path": "/environments/.gitlab-ci.env",
        },
      ],
    ]
  `);
});

test("should run 'kosko generate' when empty env", async () => {
  execAsyncModule.execAsync.mockResolvedValue({
    stderr: "",
    stdout: "execAsync mock",
  });
  dotenvModule.config.mockReturnValue({});

  const { getEnvManifests } = await import("./index");

  expect(await getEnvManifests("")).toEqual("execAsync mock");

  expect(execAsyncModule.execAsync.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        "npx --no-install kosko generate",
        Object {
          "cwd": "/",
          "env": Object {
            "FORCE_COLOR": "0",
          },
        },
      ],
    ]
  `);
  expect(dotenvModule.config.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        Object {
          "path": "/environments/.gitlab-ci.env",
        },
      ],
    ]
  `);
});

test("should run 'kosko generate --env dev'", async () => {
  execAsyncModule.execAsync.mockResolvedValue({
    stderr: "",
    stdout: "execAsync mock",
  });
  dotenvModule.config.mockReturnValue({});

  const { getEnvManifests } = await import("./index");

  expect(await getEnvManifests("dev")).toEqual("execAsync mock");

  expect(execAsyncModule.execAsync.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        "npx --no-install kosko generate --env dev",
        Object {
          "cwd": "/",
          "env": Object {
            "FORCE_COLOR": "0",
          },
        },
      ],
    ]
  `);
  expect(dotenvModule.config.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        Object {
          "path": "/environments/.gitlab-ci.env",
        },
      ],
      Array [
        Object {
          "path": "/environments/dev/.gitlab-ci.env",
        },
      ],
    ]
  `);
});

test("should run 'kosko generate --env prod'", async () => {
  execAsyncModule.execAsync.mockResolvedValue({
    stderr: "",
    stdout: "execAsync mock",
  });
  dotenvModule.config.mockReturnValue({});

  const { getEnvManifests } = await import("./index");

  expect(await getEnvManifests("prod")).toEqual("execAsync mock");

  expect(execAsyncModule.execAsync.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        "npx --no-install kosko generate --env prod",
        Object {
          "cwd": "/",
          "env": Object {
            "FORCE_COLOR": "0",
          },
        },
      ],
    ]
  `);
  expect(dotenvModule.config.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        Object {
          "path": "/environments/.gitlab-ci.env",
        },
      ],
      Array [
        Object {
          "path": "/environments/prod/.gitlab-ci.env",
        },
      ],
    ]
  `);
});

test('should run "kosko generate --env prod "!(_*)""', async () => {
  execAsyncModule.execAsync.mockResolvedValue({
    stderr: "",
    stdout: "execAsync mock",
  });
  dotenvModule.config.mockReturnValue({});

  const { getEnvManifests } = await import("./index");

  expect(await getEnvManifests("prod", "!(_*)")).toEqual("execAsync mock");

  expect(execAsyncModule.execAsync.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        "npx --no-install kosko generate --env prod !(_*)",
        Object {
          "cwd": "/",
          "env": Object {
            "FORCE_COLOR": "0",
          },
        },
      ],
    ]
  `);
  expect(dotenvModule.config.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        Object {
          "path": "/environments/.gitlab-ci.env",
        },
      ],
      Array [
        Object {
          "path": "/environments/prod/.gitlab-ci.env",
        },
      ],
    ]
  `);
});
