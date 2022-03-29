import { FlatList, Text, View } from "react-native";
import mockVideoCardData from "../../../potato/mockData/VideoCardData";
import VideoCard, { VideoCardProps } from "../cards/VideoCard";

import styles from "./VideoCardList.style";
import { useCallback, useEffect, useState } from "react";
import VideoType from "../../types/Video";
import { getVideoCardData } from "../../api/QueResourceUtils";

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
  const [cardItemData, setCardItemData] = useState<VideoType[]>([]);
  const [noMoreData, setNoMoreData] = useState<boolean>(false);

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
    ({ item }: { item: VideoType }) => {
      if (item.videoId) {
        // 정상적인 비디오 카드 데이터 처리
        return <VideoCard testID={"videoCardItem"} videoInfo={item} />;
      } else {
        // 더 이상 데이터가 없는 경우 데이터 없음 표시
        return <Text>No More Data</Text>;
      }
    },
    [cardItemData]
  );

  /**
   * 스크롤이 끝까지 내려갔을 때 처리 함수
   * 데이터를 더 불러온다.
   */
  const handleEndReached = useCallback(async () => {
    if (!noMoreData) {
      const newAppendData = await getVideoCardData(3, 1);
      if (newAppendData.length) {
        // 추가 데이터가 있는 경우
        setCardItemData((prev) => [...prev, ...newAppendData]);
      } else {
        // 데이터가 더 없는 경우
        setNoMoreData(true);
        setCardItemData((prev) => [...prev, { videoId: "" }]);
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
        testID="videoCardList"
        data={cardItemData}
        renderItem={handleRenderItem}
        onEndReached={handleEndReached}
        onEndReachedThreshold={1}
        keyExtractor={(videoCard) => {
          return videoCard.videoId;
        }}
      />
    </View>
  );
}
