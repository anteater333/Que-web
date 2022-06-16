import { useIsFocused } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import QueResourceClient from "../api/QueResourceUtils";
import VideoCardList from "../components/lists/VideoCardList";
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

  const isFocused = useIsFocused();

  /** 초기 데이터 설정 */
  useEffect(() => {
    if (isFocused) {
      async function getInitialData() {
        const initialDataLength = 5;
        const initialData = await QueResourceClient.getVideoCardData(
          initialDataLength,
          0
        );
        setVideoDataList(initialData);

        if (initialData.length < initialDataLength) {
          setNoMoreData(true);
        }
      }

      getInitialData();
    }
  }, [isFocused]);

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
    <VideoCardList
      videoData={videoDataList}
      onScrollEnded={getMoreVideoData}
      noMoreData={noMoreData}
    />
  );
}

export default TimelineScreen;
