import {
import Modal from "react-native-modal";
import React, { useEffect, useState, useCallback } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import styles from "./VideoCard.style";
import { RootStackParamList } from "../../screens/RootStackParamList";
import MenuModal, { MenuModalItem } from "../modals/MenuModal";
import Video from "../../types/Video";

type VideoCardNavProps = NativeStackNavigationProp<RootStackParamList>;

type VideoCardProps = {
  videoInfo: Video;
};

/**
 * 기본 비디오 정보 카드 컴포넌트
 * @param props
 * @returns
 */
export default function VideoCard(props: VideoCardProps) {
  const [videoUrl, setVideoUrl] = useState<String>("test");
  const [menuModalVisible, setMenuModalVisible] = useState<boolean>(false);

  const navigation = useNavigation<VideoCardNavProps>();

  useEffect(() => {}, []);

  /**
   * 카드 컴포넌트 영역을 눌렀을 때 실행됩니다.
   * 해당 비디오 카드가 가지고 있는 url을 기반으로 해서 VideoScreen으로 Navigation 합니다.
   */
  const onPressCard = useCallback(async () => {
    navigation.navigate("Video", {
      url: "gs://que-backend-dev.appspot.com/testvideo.mp4",
    });
  }, [videoUrl]);

  return (
    <TouchableOpacity
      testID="videoCard"
      style={styles.cardView}
      onPress={onPressCard}
    >
      <MenuModal
        visible={menuModalVisible}
        setModalVisible={setMenuModalVisible}
      >
        <MenuModalItem
          iconName="share"
          menuText="공유"
          onMenuPress={() => alert("menu1")}
        />
        <MenuModalItem
          iconName="flag"
          menuText="신고"
          onMenuPress={() => alert("menu2")}
        />
      </MenuModal>
      <CardThumbnailView
        uri="../../../potato/placeholders/cardImage.png"
        direction="horizontal"
        onMenuButtonPress={() => setMenuModalVisible(true)}
      />
      <CardInfoView></CardInfoView>
    </TouchableOpacity>
  );
}

/**
 * 카드 컴포넌트의 썸네일 영역
 * @param props
 * @returns
 */
function CardThumbnailView(props: {
  uri: string;
  direction: "horizontal" | "vertical";
  onMenuButtonPress: () => void;
}) {
  /** 썸네일 주소 TBD : firebase 다운로드 api 사용 메소드 구현 */
  const [thumbnail, setThumbnail] = useState(
    require("../../../potato/placeholders/cardImage.png")
  );
  /** 썸네일 이미지의 비율에 따라 resize 모드 결정 */
  const [resizeMode, setResizeMode] =
    props.direction == "horizontal"
      ? useState<"stretch" | "contain">("stretch")
      : useState<"stretch" | "contain">("contain");

  return (
    <View style={styles.thumbnailView} testID="cardThumbnailView">
      <Image
        testID="cardThumbnailImage"
        style={styles.videoThumbnailImage}
        resizeMode={resizeMode}
        source={thumbnail}
      ></Image>
      <Text testID="cardThumbnailTime" style={styles.videoTime}>
        0:00
      </Text>
      <TouchableOpacity
        testID="cardThumbnailButton"
        onPress={props.onMenuButtonPress}
        style={styles.optionButton}
      >
        <Text style={styles.optionButtonText}>...</Text>
      </TouchableOpacity>
    </View>
  );
}

/**
 * 카드 컴포넌트의 정보 영역
 * @returns
 */
function CardInfoView() {
  const [title, setTitle] = useState<string>("그리움만 쌓이네");
  const [singer, setSinger] = useState<string>("John Doe");
  const [viewCount, setViewCount] = useState<string>("10.3k");
  const [likeCount, setLikeCount] = useState<string>("2.6k");
  return (
    <View style={styles.cardInfoView}>
      <View style={styles.profilePicView}>
        <View style={styles.profilePic} />
      </View>
      <View style={styles.infoTitleView}>
        <Text style={styles.infoTitleText}>{title}</Text>
        <Text style={styles.infoSingerText}>{singer}</Text>
      </View>
      <View style={styles.reactionView}>
        <View style={styles.reactionChildView}>
          <TouchableOpacity style={styles.upperCountText}>
            <Text style={styles.upperCountText}>Th</Text>
          </TouchableOpacity>
          <Text style={styles.lowerCountText}>{likeCount}</Text>
        </View>
        <View style={styles.reactionChildView}>
          <TouchableOpacity style={styles.upperCountText}>
            <Text style={styles.upperCountText}>St</Text>
          </TouchableOpacity>
          <Text style={styles.lowerCountText}>{likeCount}</Text>
        </View>
        <View style={styles.reactionChildView}>
          <Text style={styles.upperCountText}>{viewCount}</Text>
          <Text style={styles.lowerCountText}>시청</Text>
        </View>
      </View>
    </View>
  );
}
