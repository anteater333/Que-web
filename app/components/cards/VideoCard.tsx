import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState, useCallback } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import styles from "./VideoCard.style";
import { RootStackParamList } from "../../screens/RootStackParamList";
import MenuModal, { MenuModalItem } from "../modals/MenuModal";
import Video from "../../types/Video";

type VideoCardNavProps = NativeStackNavigationProp<RootStackParamList>;

export type VideoCardProps = {
  videoInfo: Video;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

/**
 * 기본 비디오 정보 카드 컴포넌트
 * @param props
 * @returns
 */
export default function VideoCard(props: VideoCardProps) {
  const [videoUrl, setVideoUrl] = useState<String>("test");
  const [menuModalVisible, setMenuModalVisible] = useState<boolean>(false);
  const [videoLiked, setVideoLiked] = useState<boolean>(false);

  const navigation = useNavigation<VideoCardNavProps>();

  let inheritedTestID = props.testID ? props.testID : "videoCard";

  useEffect(() => {}, []);

  /**
   * 카드 컴포넌트의 프로필 사진 영역을 눌렀을 때 실행됩니다.
   * 프로필을 업로드한 사용자의 Studio 페이지로 이동합니다.
   */
  const navigateToUserProfile = useCallback(async () => {
    navigation.navigate("UserProfile");
  }, []);

  /**
   * 카드 컴포넌트의 좋아요 버튼을 눌렀을 때 실행됩니다.
   */
  const likeThisVideo = useCallback(async () => {
    // TBD 요청 보내기!

    setVideoLiked(!videoLiked);
  }, [videoLiked]);

  /**
   * 카드 컴포넌트의 평가 버튼을 눌렀을 때 실행됩니다.
   */
  const navigateToEvalutaion = useCallback(async () => {
    navigation.navigate("Evaluation");
  }, []);

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
      testID={inheritedTestID}
      style={(styles.cardView, props.style)}
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
        onPressMenuButton={() => setMenuModalVisible(true)}
      />
      <CardInfoView
        onPressProfile={navigateToUserProfile}
        onPressLike={likeThisVideo}
        onPressStar={navigateToEvalutaion}
        liked={videoLiked}
      ></CardInfoView>
    </TouchableOpacity>
  );
}

type CardThumbnailProps = {
  uri: string;
  direction: "horizontal" | "vertical";
  onPressMenuButton: () => void;
};

/**
 * 카드 컴포넌트의 썸네일 영역
 * @param props
 * @returns
 */
function CardThumbnailView(props: CardThumbnailProps) {
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
        onPress={props.onPressMenuButton}
        style={styles.optionButton}
      >
        <Text style={styles.optionButtonText}>...</Text>
      </TouchableOpacity>
    </View>
  );
}

type VideoCardInfoProps = {
  onPressProfile: () => void;
  onPressStar: () => void;
  onPressLike: () => void;
  liked?: boolean;
  starred?: boolean;
  likeCount?: number;
  viewCount?: number;
};

/**
 * 카드 컴포넌트의 정보 영역
 * @returns
 */
function CardInfoView(props: VideoCardInfoProps) {
  const [title, setTitle] = useState<string>("그리움만 쌓이네");
  const [singer, setSinger] = useState<string>("John Doe");
  const [viewCount, setViewCount] = useState<string>("10.3k");
  const [likeCount, setLikeCount] = useState<string>("2.6k");

  let likeButton;
  let starButton;
  if (props.liked) {
    likeButton = (
      <Ionicons
        testID="cardInfoLikedButton"
        name="heart"
        style={styles.upperCountText}
        color={styles.reactionButtonEnabled.color}
      ></Ionicons>
    );
  } else {
    likeButton = (
      <Ionicons
        testID="cardInfoLikeButton"
        name="heart-outline"
        style={styles.upperCountText}
        color={styles.reactionButtonDisabled.color}
      ></Ionicons>
    );
  }

  if (props.starred) {
    starButton = (
      <Ionicons
        testID="cardInfoStarredButton"
        name="star"
        style={styles.upperCountText}
        color={styles.reactionButtonEnabled.color}
      ></Ionicons>
    );
  } else {
    starButton = (
      <Ionicons
        testID="cardInfoStarButton"
        name="star-outline"
        style={styles.upperCountText}
        color={styles.reactionButtonDisabled.color}
      ></Ionicons>
    );
  }

  return (
    <View style={styles.cardInfoView}>
      <Pressable
        testID="cardInfoProfilePic"
        style={styles.profilePicView}
        onPress={props.onPressProfile}
      >
        <View style={styles.profilePic} />
      </Pressable>
      <View style={styles.infoTitleView}>
        <Text testID="cardInfoTitleText" style={styles.infoTitleText}>
          {title}
        </Text>
        <Text testID="cardInfoSingerText" style={styles.infoSingerText}>
          {singer}
        </Text>
      </View>
      {/* 좋아요, 평가점수, 시청 수 */}
      {/* 이 영역은 터치 해도 Video로 넘어가지 않도록 설정함 */}
      <TouchableWithoutFeedback>
        <View style={styles.reactionView}>
          <View style={styles.reactionChildView}>
            <TouchableOpacity onPress={props.onPressLike}>
              {likeButton}
              <Text testID="cardInfoLikeCount" style={styles.lowerCountText}>
                {likeCount}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.reactionChildView}>
            <TouchableOpacity onPress={props.onPressStar}>
              {starButton}
              <Text testID="cardInfoStarCount" style={styles.lowerCountText}>
                {likeCount}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.reactionChildView}>
            <Text style={styles.upperCountText}>{viewCount}</Text>
            <Text testID="cardInfoViewCount" style={styles.lowerCountText}>
              Views
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
