import { ReactElement } from "react";
import { afterEach, expect } from "vitest";
import * as matchers from "vitest-dom/matchers";
import {
  cleanup,
  render as rtlRender,
  RenderOptions,
} from "@testing-library/react";

import { TestWrapper } from "./TestWrapper";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

export const render = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => rtlRender(ui, { wrapper: TestWrapper, ...options });
