import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import styles from "./VideoCard.style";
import { RootStackParamList } from "../../screens/RootStackParamList";
import MenuModal, { MenuModalItem } from "../modals/MenuModal";
import VideoType from "../../types/Video";
import { formatCount, formatTimer } from "../../utils/formatter";
import { getImageDownloadURL } from "../../api/QueResourceUtils";

type VideoCardNavProps = NativeStackNavigationProp<RootStackParamList>;

export type VideoCardProps = {
  videoInfo: VideoType;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

/**
 * 기본 비디오 정보 카드 컴포넌트
 * @param props
 * @returns
 */
export default function VideoCard(props: VideoCardProps) {
  /** 메뉴 모달 표시 여부 toggle */
  const [menuModalVisible, setMenuModalVisible] = useState<boolean>(false);
  /** 형식 변환된 시청 수 */
  const [strViewCount, setStrViewCount] = useState<string>(
    formatCount(props.videoInfo.viewCount!)
  );
  /** 형식 변환된 좋아요 수 */
  const [strLikeCount, setStrLikeCount] = useState<string>(
    formatCount(props.videoInfo.likeCount!)
  );
  /** 형식 변환된 평가 수 */
  const [strStarCount, setStrStarCount] = useState<string>(
    formatCount(props.videoInfo.starCount!)
  );
  /** 사용자의 좋아요 여부 */
  const [videoLiked, setVideoLiked] = useState<boolean>(false);
  /** 사용자의 평가 여부 */
  const [videoStarred, setVideoStarred] = useState<boolean>(false);

  // 상위 컴포넌트의 UnitTest를 위한 testID가 주어진 경우
  let inheritedTestID = props.testID ? props.testID : "videoCard";

  useEffect(() => {}, []);

  /** 네비게이션 객체 사용 */
  const navigation = useNavigation<VideoCardNavProps>();

  /**
   * 카드 컴포넌트 영역을 눌렀을 때 실행됩니다.
   * 해당 비디오 카드가 가지고 있는 url을 기반으로 해서 VideoScreen으로 Navigation 합니다.
   */
  const onPressCard = useCallback(async () => {
    navigation.navigate("Video", {
      url: props.videoInfo.sourceUrl!,
    });
  }, [props.videoInfo.sourceUrl]);

  /**
   * 카드 컴포넌트의 프로필 사진 영역을 눌렀을 때 실행됩니다.
   * 프로필을 업로드한 사용자의 Studio 페이지로 이동합니다.
   */
  const navigateToUserProfile = useCallback(async () => {
    navigation.navigate("UserProfile");
  }, []);

  /**
   * 카드 컴포넌트의 평가 버튼을 눌렀을 때 실행됩니다.
   */
  const navigateToEvalutaion = useCallback(async () => {
    navigation.navigate("Evaluation");
  }, []);

  /**
   * 카드 컴포넌트의 좋아요 버튼을 눌렀을 때 실행됩니다.
   */
  const likeThisVideo = useCallback(async () => {
    // TBD 요청 보내기!

    setVideoLiked(!videoLiked);
  }, [videoLiked]);

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
        uri={props.videoInfo.thumbnailUrl!}
        length={props.videoInfo.length!}
        direction="vertical"
        onPressMenuButton={() => setMenuModalVisible(true)}
      />
      <CardInfoView
        onPressProfile={navigateToUserProfile}
        onPressLike={likeThisVideo}
        onPressStar={navigateToEvalutaion}
        liked={videoLiked}
        starred={videoStarred}
        title={props.videoInfo.title}
        uploaderName={props.videoInfo.uploader?.nickname}
        viewCount={strViewCount}
        likeCount={strLikeCount}
        starCount={strStarCount}
      ></CardInfoView>
    </TouchableOpacity>
  );
}

type CardThumbnailProps = {
  uri: string;
  length: number;
  direction: "horizontal" | "vertical";
  onPressMenuButton: () => void;
};

/**
 * 카드 컴포넌트의 썸네일 영역
 * @param props
 * @returns
 */
function CardThumbnailView(props: CardThumbnailProps) {
  /** 영상 길이 */
  const [modifiedVideoLength, setModifiedLength] = useState<String>(
    props.length ? formatTimer(props.length) : "0:00"
  );
  /** 썸네일 주소 TBD : firebase 다운로드 api 사용 메소드 구현 */
  const [thumbnail, setThumbnail] = useState<ImageSourcePropType>({});
  /** 썸네일 이미지의 비율에 따라 resize 모드 결정 */
  const [resizeMode, setResizeMode] =
    props.direction == "horizontal"
      ? useState<"stretch" | "contain">("stretch")
      : useState<"stretch" | "contain">("contain");
  /** TBD: 썸네일에 로딩 표시 하기 */
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    /**
     * 카드의 썸네일로 사용할 이미지를 서버로부터 다운로드받는다.
     */
    async function downloadImage() {
      const downloadURL = await getImageDownloadURL(props.uri);
      setThumbnail({ uri: downloadURL });
    }

    setIsLoading(true);
    downloadImage();

    // clean-up
    return () => setIsLoading(false);
  }, []);

  return (
    <View style={styles.thumbnailView} testID="cardThumbnailView">
      <Image
        testID="cardThumbnailImage"
        style={styles.videoThumbnailImage}
        resizeMode={resizeMode}
        source={thumbnail}
      ></Image>
      <Text testID="cardThumbnailTime" style={styles.videoTime}>
        {modifiedVideoLength}
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
  title?: string;
  uploaderName?: string;
  liked?: boolean;
  starred?: boolean;
  likeCount?: string;
  starCount?: string;
  viewCount?: string;
};

/**
 * 카드 컴포넌트의 정보 영역
 * @returns
 */
function CardInfoView(props: VideoCardInfoProps) {
  // 좋아요 / 평가 여부에 따라 버튼 표시 변경
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
          {props.title}
        </Text>
        <Text testID="cardInfoSingerText" style={styles.infoSingerText}>
          {props.uploaderName}
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
                {props.likeCount}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.reactionChildView}>
            <TouchableOpacity onPress={props.onPressStar}>
              {starButton}
              <Text testID="cardInfoStarCount" style={styles.lowerCountText}>
                {props.starCount}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.reactionChildView}>
            <Text style={styles.upperCountText}>{props.viewCount}</Text>
            <Text testID="cardInfoViewCount" style={styles.lowerCountText}>
              Views
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
