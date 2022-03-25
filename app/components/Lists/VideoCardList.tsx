import { FlatList, View } from "react-native";
import mockVideoCardData, {
  mockVideoCardData2,
} from "../../../potato/mockData/VideoCardData";
import VideoCard, { VideoCardProps } from "../cards/VideoCard";

import styles from "./VideoCardList.style";
import { useCallback, useEffect, useState } from "react";

type VideoCardListProps = {
  initialData?: VideoCardProps[];
};

/**
 * 비디오 카드 컴포넌트를 담는 스크롤 가능한 리스트 컴포넌트
 * 타임라인에 사용
 * @param props
 * @returns
 */
export default function VideoCardList(props: VideoCardListProps) {
  const [cardItemData, setCardItemData] = useState<VideoCardProps[]>(
    props.initialData ? props.initialData : mockVideoCardData
  );

  useEffect(() => {}, [cardItemData]);

  /**
   * 카드 리스트 아이템 렌더링 함수
   * @param param0
   * @returns
   */
  const handleRenderItem = useCallback(
    ({ item }: { item: VideoCardProps }) => {
      return <VideoCard testID={"videoCardItem"} videoInfo={item.videoInfo} />;
    },
    [cardItemData]
  );

  /**
   * 스크롤이 끝까지 내려갔을 때 처리 함수
   * 데이터를 더 불러온다.
   */
  const handleEndReached = useCallback(() => {
    // 이 상태로 놔두니까 컴퓨터가 터질라해요
    // setCardItemData((prev) => [...prev, ...mockVideoCardData2]);
  }, [cardItemData]);

  return (
    <View testID="videoCardListContainer" style={styles.cardListConatiner}>
      <FlatList
        testID="videoCardList"
        data={cardItemData}
        renderItem={handleRenderItem}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.2}
        keyExtractor={(videoCard) => {
          return videoCard.videoInfo.videoId;
        }}
      />
    </View>
  );
}
