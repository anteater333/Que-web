import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react-native";
import VideoCardList from "./VideoCardList";
import mockVideoCardData, {
  mockVideoCardData2,
} from "../../../potato/mockData/VideoCardData";

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

let component = render(<VideoCardList initialData={mockVideoCardData} />);
beforeEach(() => {
  component = render(<VideoCardList initialData={mockVideoCardData} />);
  componentJSON = component.toJSON();
});

afterEach(cleanup);

describe("VideoCardList", () => {
  const testDataLength = mockVideoCardData.length;
  it("리스트 컴포넌트가 잘 렌더링 된다.", () => {
    const cardListContainer = component.getByTestId("videoCardListContainer");
    const cardList = component.getByTestId("videoCardList");

    expect(cardListContainer).toBeTruthy();
    expect(cardList).toBeTruthy();
  });

  it("리스트는 카드 아이템을 10개 이상 가지고 있다. <= 수정 필요", () => {
    const cardListItems = component.getAllByTestId("videoCardItem");

    expect(cardListItems.length).toBeGreaterThanOrEqual(testDataLength);
  });

  it("아래 끝 까지 스크롤 시 데이터가 추가된다.", async () => {
    const eventData = {
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
    fireEvent.scroll(list, eventData);

    const newItem = await component.findByText(
      mockVideoCardData2[0].videoInfo.title
    );

    expect(newItem).toBeTruthy();
  });
});
