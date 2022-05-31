import { Video } from "expo-av";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { getVideoDownloadURL } from "../api/QueResourceUtils";
import MainVideoPlayer from "../components/videoPlayers/MainVideoPlayer";
import { MainStackScreenProp } from "../navigators/MainNavigator";
import { bColors } from "../styles/base";

/**
 * 비디오 재생 화면
 */
const VideoScreen = ({ route, navigation }: MainStackScreenProp<"Video">) => {
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
      <MainVideoPlayer
        videoData={route.params.videoInfo}
        videoSource={videoUrl}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bColors.black,
  },
});

export default VideoScreen;
