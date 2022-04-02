import { View } from "react-native";
import VideoCardList from "../components/Lists/VideoCardList";

/**
 * 영상 타임라인 스크린
 * 사실 VideoCardList 하나 딸랑 있는
 */
function TimelineScreen() {
  return (
    <View testID="timelineScreen">
      <VideoCardList />
    </View>
  );
}

export default TimelineScreen;
