import React from "react";
import renderer from "react-test-renderer";
import { waitFor } from "@testing-library/react-native";

import App from "./App";

describe("<App />", () => {
    it("has 2 children", async () => {
        const tree = renderer.create(<App />, {
            createNodeMock: (element) => {
                if (element.type === App) {
                    return element.props.children;
                }
                return null;
            },
        });
        await waitFor(() => {
            const treeJSON = tree.toJSON();
            expect(treeJSON.children.length).toBe(2);
        });
    });
});
