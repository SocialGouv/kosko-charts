//

export interface AssertEnvErrorKey {
  name: string;
  reason: string;
}

export class AssertEnvError extends Error {
  constructor(message: string) {
    super("Wrong environment variables\n" + message);

    this.name = this.constructor.name;

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }

  static format(errors: AssertEnvErrorKey[]): AssertEnvError {
    const message = errors.reduce(
      (memo, errorOnKey) =>
        memo + `required "${errorOnKey.name}": ${errorOnKey.reason}\n`,
      ""
    );
    return new AssertEnvError(message);
  }
}

export function isNotDefined(value: unknown): string | false {
  return value ? false : `"${value}" should be defined`;
}

export function isNotAString(value: unknown): string | false {
  return typeof value === "string" ? false : `"${value}" should be string`;
}

export function isNotEmptyString(value: unknown): string | false {
  return (value as string).trim() !== ""
    ? false
    : `"${value}" should not be an empty string`;
}

// required property \\"CI_ENVIRONMENT_NAME\\"
// └─ cannot decode undefined, should be string
export function assertEnv(keys: string[]) {
  return function assertFn(env = process.env): never | void {
    const errors = keys.reduce<AssertEnvErrorKey[]>((memo, key) => {
      const reason =
        isNotDefined(env[key]) ||
        isNotAString(env[key]) ||
        isNotEmptyString(env[key]);

      return reason ? [...memo, { name: key, reason }] : memo;
    }, []);

    if (errors.length) throw AssertEnvError.format(errors);
  };
}
