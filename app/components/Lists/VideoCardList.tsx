import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageSourcePropType,
  Text,
  View,
} from "react-native";
import mockVideoCardData from "../../../potato/mockData/VideoCardData";
import VideoCard, { VideoCardProps } from "../cards/VideoCard";

import { Asset, useAssets } from "expo-asset";
import styles from "./VideoCardList.style";
import { useCallback, useEffect, useState } from "react";
import VideoType from "../../types/Video";
import { getVideoCardData } from "../../api/QueResourceUtils";
import { bColors } from "../../styles/base";

type VideoCardListProps = {
  initialData?: VideoType[];
};

/**
 * 비디오 카드 컴포넌트를 담는 스크롤 가능한 리스트 컴포넌트
 * 타임라인에 사용
 * @param props
 * @returns
 */
export default function VideoCardList(props: VideoCardListProps) {
  const [cardItemData, setCardItemData] = useState<(VideoType | Indicator)[]>(
    []
  );
  const [noMoreData, setNoMoreData] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {}, [cardItemData]);

  /**
   * 최초 데이터 설정
   */
  const handleLayout = useCallback(async () => {
    setCardItemData(await getVideoCardData(5, 0));
  }, [cardItemData]);

  /**
   * 카드 리스트 아이템 렌더링 함수
   * @param param0
   * @returns
   */
  const handleRenderItem = useCallback(
    ({ item }: { item: VideoType | Indicator }) => {
      if ((item as VideoType).videoId) {
        // 정상적인 비디오 카드 데이터 처리
        return (
          <VideoCard testID={"videoCardItem"} videoInfo={item as VideoType} />
        );
      } else {
        // 로딩중 표시
        if ((item as Indicator).indicatorType == "isLoading")
          return <LoadingIndicator />;
        // 더 이상 데이터가 없는 경우 데이터 없음 표시
        else if ((item as Indicator).indicatorType == "noMoreData")
          return <NoMoreDataIndicator />;
        else return null;
      }
    },
    [cardItemData, isLoading, noMoreData]
  );

  /**
   * 스크롤이 끝까지 내려갔을 때 처리 함수
   * 데이터를 더 불러온다.
   */
  const handleEndReached = useCallback(async () => {
    if (!noMoreData && !isLoading) {
      // 한 번에 가져올 데이터 수 (서비스가 가진 데이터 수에 따라 적절하게 늘리자)
      const cardPerPage = 3;

      setIsLoading(true);
      setCardItemData((prev) => [...prev, { indicatorType: "isLoading" }]);
      // 데이터 가져오기
      const newAppendData = await getVideoCardData(cardPerPage, 1);
      setIsLoading(false);
      setCardItemData([...cardItemData.slice(0, -1)]);

      if (newAppendData.length == cardPerPage) {
        // 추가 데이터가 있는 경우
        setCardItemData((prev) => [...prev, ...newAppendData]);
      } else {
        // 데이터가 더 없는 경우
        setNoMoreData(true);
        setCardItemData((prev) => [
          ...prev,
          ...newAppendData,
          { indicatorType: "noMoreData" },
        ]);
      }
    }
  }, [cardItemData]);

  return (
    <View
      testID="videoCardListContainer"
      style={styles.cardListConatiner}
      onLayout={handleLayout}
    >
      <FlatList
        showsHorizontalScrollIndicator={false}
        testID="videoCardList"
        data={cardItemData}
        renderItem={handleRenderItem}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.2}
        keyExtractor={(listItem) => {
          if ((listItem as VideoType).videoId)
            return (listItem as VideoType).videoId;
          else return (listItem as Indicator).indicatorType;
        }}
      />
    </View>
  );
}

/**
 * 카드 리스트에 적용할 수 있는 메타 정보를 나타내는 인디케이터 타입
 */
type Indicator = {
  indicatorType: "noMoreData" | "isLoading";
};

/**
 * 더 불러올 데이터가 없는 경우 출력할 작은 아이콘
 * @returns
 */
function NoMoreDataIndicator() {
  const [assets, error] = useAssets([require("../../assets/favicon.png")]);
  return (
    <View style={styles.indicatorContainer}>
      {assets ? (
        <Image
          style={styles.noMoreDataImage}
          source={assets[0] as ImageSourcePropType}
        />
      ) : null}
    </View>
  );
}

/**
 * 로딩 중임을 나타내는 스피너
 * @returns
 */
function LoadingIndicator() {
  return (
    <View style={styles.indicatorContainer}>
      <ActivityIndicator color={bColors.primary} size="large" />
    </View>
  );
}
