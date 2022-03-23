import React from "react";
import { render, waitFor } from "@testing-library/react-native";

import App from "./App";

describe("<App />", () => {
  it("잘 렌더링 된다.", async () => {
    const appScreen = render(<App />);

    expect(appScreen).toBeTruthy();
  });
});
