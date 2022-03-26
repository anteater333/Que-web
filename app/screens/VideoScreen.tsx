import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Video } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { getVideoDownloadURL } from "../api/QueResourceUtils";
import { RootStackParamList } from "./RootStackParamList";

type Props = NativeStackScreenProps<RootStackParamList, "Video">;

const VideoScreen = ({ route, navigation }: Props) => {
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
    width: 320,
    height: 200,
  },
  video: {
    width: 320,
    height: 200,
  },
  buttons: {},
});

export default VideoScreen;
