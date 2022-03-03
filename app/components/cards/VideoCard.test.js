import React from "react";
import renderer from "react-test-renderer";
import { waitFor } from "@testing-library/react-native";

import VideoCard from "./VideoCard";

describe("<VideoCard />", () => {
  it("자식 둘을 가진다.", async () => {
    const tree = renderer.create(<VideoCard />);
    const treeJSON = tree.toJSON();

    expect(treeJSON.children.length).toBe(2);
  });
});
