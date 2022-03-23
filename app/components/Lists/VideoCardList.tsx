import { FlatList, View } from "react-native";
import Video from "../../types/Video";
import mockVideoCardData from "../../../potato/mockData/VideoCardData";
import VideoCard, { VideoCardProps } from "../cards/VideoCard";

import styles from "./VideoCardList.style";

/**
 * 마이 포테이토 서버
 */

type VideoCardListProps = {
  initialData: VideoCardProps[];
};

/**
 * 비디오 카드 컴포넌트를 담는 스크롤 가능한 리스트 컴포넌트
 * 타임라인에 사용
 * @param props
 * @returns
 */
export default function VideoCardList(props: VideoCardListProps) {
  const renderItem = ({ item }: { item: VideoCardProps }) => {
    return <VideoCard testID={"videoCardItem"} videoInfo={item.videoInfo} />;
  };

  return (
    <View testID="videoCardListContainer" style={styles.cardListConatiner}>
      <FlatList
        testID="videoCardList"
        data={props.initialData ? props.initialData : mockVideoCardData}
        renderItem={renderItem}
        onEndReached={() => {
          console.log("뵹");
        }}
        onEndReachedThreshold={0.2}
        keyExtractor={(videoCard) => {
          return videoCard.videoInfo.videoId;
        }}
      />
    </View>
  );
}
