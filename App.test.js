import React from "react";
import { render } from "@testing-library/react-native";
import { waitFor } from "@testing-library/react-native";

import App from "./App";

describe("<App />", () => {
  it("has 2 children", async () => {
    const appScreen = render(<App />);
    await waitFor(() => {
      const screen = appScreen.getByTestId("appScreen");
      expect(screen.children.length).toBe(2);
    });
  });
});
