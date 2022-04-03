import React from "react";
import {
  act,
  cleanup,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react-native";
import VideoCardList from "./VideoCardList";

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

let component = render(<VideoCardList />);
beforeEach(() => {
  component = render(<VideoCardList />);
  componentJSON = component.toJSON();
});

afterEach(cleanup);

describe("VideoCardList", () => {
  let initialListLength = 0;

  it("리스트 컴포넌트가 잘 렌더링 된다.", () => {
    const cardList = component.getByTestId("videoCardList");

    expect(cardList).toBeTruthy();
  });

  it("리스트는 카드 아이템을 1개 이상 가지고 있다.", async () => {
    // layout 이벤트 발생
    const cardListContainer = component.getByTestId("videoCardList");
    act(() => {
      fireEvent(cardListContainer, "layout", {
        nativeEvent: { layout: { width: 300 } },
      });
    });

    const cardListItems = await component.findAllByTestId("videoCardItem");

    initialListLength = cardListItems.length;
    expect(cardListItems.length).toBeGreaterThanOrEqual(1);
  });

  it("아래 끝 까지 스크롤 시 데이터가 추가된다.", async () => {
    // layout 이벤트 발생
    const cardListContainer = component.getByTestId("videoCardList");
    act(() => {
      fireEvent(cardListContainer, "layout", {
        nativeEvent: { layout: { width: 300 } },
      });
    });

    const scrollEventData = {
      nativeEvent: {
        contentOffset: {
          y: 500,
        },
        contentSize: {
          // Dimensions of the scrollable content
          height: 500,
          width: 100,
        },
        layoutMeasurement: {
          // Dimensions of the device
          height: 100,
          width: 100,
        },
      },
    };
    const list = component.getByTestId("videoCardList");
    act(() => {
      fireEvent.scroll(list, scrollEventData);
    });
    waitFor(async () => {
      const cardListItems = await component.findAllByTestId("videoCardItem");
      expect(cardListItems.length).toBeGreaterThan(initialListLength);
    });
  });
});
