import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react-native";

import VideoCard from "./VideoCard";
import { NavigationContainer } from "@react-navigation/native";

/** 네비게이션 모의 함수 */
const mockedNavigate = jest.fn();

/** Mocking React navigation */
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

let component = render(<VideoCard />);
let componentJSON = component.toJSON();

beforeEach(() => {
  component = render(<VideoCard />);
});

afterEach(cleanup);

describe("VideoCard", () => {
  it("두 View 영역으로 나뉜다.", () => {
    expect(componentJSON.children.length).toBe(2);
    expect(componentJSON.children[0].type).toBe("View");
    expect(componentJSON.children[1].type).toBe("View");
  });

  it("카드를 누를 시 Navigation이 진행된다.", async () => {
    fireEvent.press(component.getByTestId("videoCard"));

    /** mockedNavigate 총 호출 수에 대해서 주의 */
    expect(mockedNavigate).toHaveBeenCalledTimes(1);
  });

  describe("첫 번째 View 영역", () => {
    it("이미지, 시간, 추가 옵션 버튼으로 이루어진다.", () => {
      const view = component.getByTestId("cardThumbnailView");
      const image = component.getByTestId("cardThumbnailImage");
      const time = component.getByTestId("cardThumbnailTime");
      const button = component.getByTestId("cardThumbnailButton");

      expect(view.children.length).toBe(3);
      expect(image.props.source.uri).not.toBe("");
      expect(time).not.toBeNull();
      expect(button).not.toBeNull();
    });

    it("버튼을 누를 시 추가 메뉴 모달을 출력한다.", async () => {
      fireEvent.press(component.getByTestId("cardThumbnailButton"));
      const menuModal = await component.findByTestId("videoCardMenuModal");
      expect(menuModal).toBeTruthy();
    });
  });

  describe("두 번재 view 영역", () => {
    it("프로필 사진, 제목, 사용자 이름, 시청 수, 좋아요, 평가점수로 이루어진다.", () => {
      const profilePic = component.getByTestId("cardInfoProfilePic");
      const title = component.getByTestId("cardInfoTitleText");
      const singer = component.getByTestId("cardInfoSingerText");
      const views = component.getByTestId("cardInfoViewCount");
      const likes = component.getByTestId("cardInfoLikeCount");
      const stars = component.getByTestId("cardInfoStarCount");

      expect(profilePic).toBeTruthy();
      expect(title).toBeTruthy();
      expect(singer).toBeTruthy();
      expect(views).toBeTruthy();
      expect(likes).toBeTruthy();
      expect(stars).toBeTruthy();
    });

    it("프로필 사진을 누르면 Navigation이 진행된다.", async () => {
      fireEvent.press(component.getByTestId("cardInfoProfilePic"));

      const newScreen = await component.findByTestId("userPageScreen");
    });

    it("좋아요 아이콘을 누르면 좋아한다.", async () => {
      fireEvent.press(component.getByTestId("cardInfoLikeButton"));

      const changed = await component.findByTestId("cardInfoLikeButton");
      expect(changed.props.liked).toBe(true);
    });

    it("평가 아이콘을 누르면 Navigation이 진행된다.", async () => {
      fireEvent.press(component.getByTestId("cardInfoStarButton"));

      const newScreen = await component.findByTestId("starScreen");
      expect(newScreen).toBeTruthy();
    });
  });
});
