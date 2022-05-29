import { Video } from "expo-av";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { getVideoDownloadURL } from "../api/QueResourceUtils";
import { MainStackScreenProp } from "../navigators/MainNavigator";

/**
 * 비디오 재생 화면
 */
const VideoScreen = ({ route, navigation }: MainStackScreenProp<"Video">) => {
  const videoPlayer = useRef<Video>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    async function fetchVideo() {
      const httpDownloadUrl = await getVideoDownloadURL(route.params.url);
      setVideoUrl(httpDownloadUrl);
    }

    fetchVideo();
  }, [videoUrl]);

  /** 임시 버튼 액션 함수, 재생 / 정지 */
  const togglePlay = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
      videoPlayer.current?.pauseAsync();
    } else {
      setIsPlaying(true);
      videoPlayer.current?.playAsync();
    }
  }, [isPlaying]);

  return (
    <View style={styles.container}>
      <Video
        style={styles.video}
        ref={videoPlayer}
        source={{
          uri: videoUrl,
        }}
        usePoster={true}
      ></Video>
      <View style={styles.buttons}>
        <Button title={"test"} onPress={togglePlay} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: { flex: 1 },
  buttons: {},
});

export default VideoScreen;
