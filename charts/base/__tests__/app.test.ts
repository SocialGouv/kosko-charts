/* eslint-disable @typescript-eslint/no-var-requires */
//

import { dirname, join } from "path";
import { Environment } from "@kosko/env";

const chartPath = dirname(__dirname);

describe("service", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("should return a service", () => {
    const {
      default: components,
      ["service"]: component,
    } = require("../components/app");

    expect(components).toContain(component);
  });

  it("should return a local service", () => {
    const env = new Environment(chartPath);
    env.paths.global = "environments/#{environment}/global";
    env.env = ["local"];

    jest.doMock("@kosko/env", () => ({
      __esModule: true,
      default: env,
    }));

    const { ["service"]: component } = require("../components/app");

    expect(() => component.validate()).not.toThrowError();
    expect(component).toMatchSnapshot();
  });

  it("should return a gitlab namespace", () => {
    const env = new Environment(chartPath);
    env.paths.global = "environments/#{environment}/global";
    env.env = ["gitlab"];

    jest.doMock("@kosko/env", () => ({
      __esModule: true,
      default: env,
    }));

    require("dotenv").config({ path: join(__dirname, ".gitlab.env") });

    // then
    const { ["service"]: component } = require("../components/app");

    expect(() => component.validate()).not.toThrowError();
    expect(component).toMatchSnapshot();
  });
});
