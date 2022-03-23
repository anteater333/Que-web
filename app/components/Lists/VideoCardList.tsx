import { FlatList, View } from "react-native";
import Video from "../../types/Video";
import VideoCard, { VideoCardProps } from "../cards/VideoCard";

import styles from "./VideoCardList.style";

/**
 * 마이 포테이토 서버
 */
const DATA: VideoCardProps[] = [
  { videoInfo: { videoId: "1" } },
  { videoInfo: { videoId: "2" } },
  { videoInfo: { videoId: "3" } },
  { videoInfo: { videoId: "4" } },
  { videoInfo: { videoId: "5" } },
  { videoInfo: { videoId: "6" } },
  { videoInfo: { videoId: "7" } },
  { videoInfo: { videoId: "8" } },
  { videoInfo: { videoId: "9" } },
];

type VideoCardListProps = {};

/**
 * 비디오 카드 컴포넌트를 담는 스크롤 가능한 리스트 컴포넌트
 * 타임라인에 사용
 * @param props
 * @returns
 */
export default function VideoCardList(props: VideoCardListProps) {
  const renderItem = ({ item }: { item: VideoCardProps }) => {
    return <VideoCard videoInfo={item.videoInfo} />;
  };

  return (
    <View style={styles.cardListConatiner}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(videoCard) => {
          return videoCard.videoInfo.videoId;
        }}
      />
    </View>
  );
}
