import Home from "../../src/views/home";

import { render } from "../config/setup";

describe("Home > views/admin.home.view.tsx", () => {
  it("should render home page", () => {
    const element = render(<Home />);
    expect(element.container).toBeDefined();
  });
});
