import { Video } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { getVideoDownloadURL } from "../api/QueResourceUtils";
import { MainStackScreenProp } from "../navigators/MainNavigator";

/**
 * 비디오 재생 화면
 */
const VideoScreen = ({ route, navigation }: MainStackScreenProp<"Video">) => {
  const videoPlayer = useRef<Video>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");

  useEffect(() => {
    async function fetchVideo() {
      const httpDownloadUrl = await getVideoDownloadURL(route.params.url);
      setVideoUrl(httpDownloadUrl);
    }

    fetchVideo();
  }, [videoUrl]);

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
        <Button
          title={"test"}
          onPress={() => videoPlayer.current?.playAsync()}
        />
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
