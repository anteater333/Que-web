import React from "react";
import { cleanup, render } from "@testing-library/react-native";
import { toHaveStyle } from "@testing-library/jest-native";

import VideoCard from "./VideoCard";
import { Image, Text } from "react-native";

let component = render(<VideoCard />);
let componentJSON = component.toJSON();

beforeEach(() => {
  component = render(<VideoCard />);
});

afterEach(cleanup);

describe("VideoCard", () => {
  expect.extend({ toHaveStyle });

  it("두 View 영역으로 나뉜다.", () => {
    expect(componentJSON.children.length).toBe(2);
    expect(componentJSON.children[0].type).toBe("View");
    expect(componentJSON.children[1].type).toBe("View");
  });

  it("카드를 누를 시 VideoScene으로 이동한다.", () => {});

  describe("첫 번째 View 영역", () => {
    it("이미지, 시간, 추가 옵션 버튼으로 이루어진다.", () => {
      const view = component.getByTestId("cardThumbnailView");
      const image = component.getByTestId("cardThumbnailImage");
      const time = component.getByTestId("cardThumbnailTime");
      const button = component.getByTestId("cardThumbnailButton");

      expect(view.children.length).toBe(3);
      expect(image.props.source.uri).not.toBe("");
    });

    const cardThumbnailStyle = {};
    it("cardThumbnailStyle을 따른다.", () => {});

    it("버튼을 누를 시 추가 메뉴 모달을 출력한다.", () => {});
  });

  describe("두 번재 view 영역", () => {
    it("프로필 사진, 제목, 사용자 이름, 시청 수, 좋아요, 평가점수로 이루어진다.", () => {});

    const cardInfoStyle = {};
    it("cardInfoStyle을 따른다.", () => {});

    it("프로필 사진을 누르면 StudioScene으로 이동한다.", () => {});
  });
});
