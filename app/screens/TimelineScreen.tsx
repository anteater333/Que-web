import { useIsFocused } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import QueResourceClient from "../api/QueResourceUtils";
import notices from "../assets/notices/notices";
import VideoCardList from "../components/lists/VideoCardList";
import NoticeModal from "../components/modals/NoticeModal";
import { useLoadingIndicator } from "../hooks/useLoadingIndicator";
import screens from "../styles/screens";
import VideoType from "../types/Video";

/**
 * 영상 타임라인 스크린
 * API 콜은 여기서 합시다.
 */
function TimelineScreen() {
  /** 서버로부터 가저온 비디오 데이터 목록 */
  const [videoDataList, setVideoDataList] = useState<VideoType[]>([]);
  /** 가저올 비디오 데이터가 더 있는지 여부 */
  const [noMoreData, setNoMoreData] = useState<boolean>(false);

  /** 서비스 공지사항 존재 시 안내 메세지 표시 */
  const [hasNotice, setHasNotice] = useState<boolean>(true);

  const isFocused = useIsFocused();

  const loading = useLoadingIndicator();

  /** 초기 데이터 설정 */
  useEffect(() => {
    if (isFocused) {
      async function getInitialData() {
        loading.showLoading("영상 목록을 불러오고 있습니다.");
        const initialDataLength = 5;
        const initialData = await QueResourceClient.getVideoCardData(
          initialDataLength,
          0
        );
        setVideoDataList(initialData);

        if (initialData.length < initialDataLength) {
          setNoMoreData(true);
        }
        loading.hideLoading();
      }

      getInitialData();
    }
  }, [isFocused]);

  /** 스크롤 시 비디오 더 가져오기 */
  const getMoreVideoData = useCallback(async () => {
    const cardPerPage = 3;
    const newDataset = await QueResourceClient.getVideoCardData(cardPerPage, 1);
    setVideoDataList((prev) => {
      return [...prev, ...newDataset];
    });

    if (newDataset.length < cardPerPage) {
      setNoMoreData(true);
    }
  }, [videoDataList]);

  return (
    <View style={screens.defaultScreenLayout}>
      <NoticeModal
        visible={hasNotice}
        setModalVisible={setHasNotice}
        pages={notices}
      />
      <VideoCardList
        videoData={videoDataList}
        onScrollEnded={getMoreVideoData}
        noMoreData={noMoreData}
      />
    </View>
  );
}

export default TimelineScreen;
