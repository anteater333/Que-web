import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { getVideoDownloadURL } from "../api/QueResourceUtils";
import { useLoadingIndicator } from "../hooks/useLoadingIndicator";
import { MainStackScreenProp } from "../navigators/MainNavigator";
import screens from "../styles/screens";
import CommonHeader from "../components/headers/CommonHeader";
import { VideoDataInputFieldSet } from "./UploadScreen/InputDataScreen";
import SongType from "../types/Song";
import PlaceType from "../types/Place";
import RoundedButton from "../components/buttons/RoundedButton";
import { bFont, bSpace } from "../styles/base";

/**
 * 비디오 재생 화면
 */
const VideoEditScreen = ({
  route,
  navigation,
}: MainStackScreenProp<"VideoEdit">) => {
  const [videoPath, setVideoPath] = useState<string>("");
  const [editVideoTitle, setEditVideoTitle] = useState<string>("");
  const [editVideoDescription, setEditVideoDescription] = useState<string>("");
  const [editSongInfo, setEditSongInfo] = useState<SongType>({});
  const [editPlaceInfo, setEditPlaceInfo] = useState<PlaceType>({});

  const [postable, setPostable] = useState<boolean>(false);

  const loading = useLoadingIndicator();

  /** 수정 화면 로드 시 데이터 처리 */
  useEffect(() => {
    async function fetchVideo() {
      loading.showLoading("영상을 불러오고 있습니다.");

      const prVideoData = route.params.videoData;
      let httpDownloadUrl = "";
      if (prVideoData.sourceUrl)
        httpDownloadUrl = await getVideoDownloadURL(prVideoData.sourceUrl!);
      setVideoPath(httpDownloadUrl);
      setEditVideoTitle(prVideoData.title!);
      setEditVideoDescription(prVideoData.description!);
      setEditSongInfo(prVideoData.song!);
      setEditPlaceInfo(prVideoData.place!);
      loading.hideLoading();
    }

    if (route.params.videoData.videoId) fetchVideo();
  }, [route.params.videoData]);

  /** 헤더 설정 */
  useEffect(() => {
    navigation.setOptions({
      header: (props) => {
        return (
          <CommonHeader
            {...props}
            buttonType={postable ? "enabledBorder" : "disabled"}
            onPress={() => {
              alert("TBD");
            }}
          />
        );
      },
      headerShown: true,
    });
  }, [postable]);

  return (
    <SafeAreaView style={screens.defaultScreenLayout}>
      <VideoDataInputFieldSet
        videoPath={videoPath}
        videoTitle={editVideoTitle}
        setVideoTitle={setEditVideoTitle}
        videoDescription={editVideoDescription}
        setVideoDescription={setEditVideoDescription}
        songInfo={editSongInfo}
        setSongInfo={setEditSongInfo}
        placeInfo={editPlaceInfo}
        setPlaceInfo={setEditPlaceInfo}
      />
      <View style={styles.bottomDangerZone}>
        <RoundedButton style={styles.roundedButton} buttonType="danger">
          영상 삭제
        </RoundedButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomDangerZone: {
    paddingBottom: bSpace.middle,
    alignItems: "flex-end",
  },
  roundedButton: {
    width: bSpace.large * 6,
    height: bFont.large * 2,
    fontSize: bFont.large,
    marginRight: bSpace.middle,
  },
});

export default VideoEditScreen;
