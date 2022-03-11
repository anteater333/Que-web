import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import styles from "./VideoCard.style";
import { RootStackParamList } from "../../screens/RootStackParamList";

type videoCardProp = NativeStackNavigationProp<RootStackParamList>;

/**
 *
 * @param props
 * @returns
 */
export default function VideoCard(props: {}) {
  const [url, setUrl] = useState<String>("test");
  const navigation = useNavigation<videoCardProp>();
  useEffect(() => {}, []);

  const onPressCard = useCallback(async () => {
    navigation.navigate("Video", {
      url: "gs://que-backend-dev.appspot.com/testvideo.mp4",
    });
  }, [url]);

  return (
    <TouchableOpacity
      testID="videoCard"
      style={styles.cardView}
      onPress={onPressCard}
    >
      <CardThumbnailView uri="../../../potato/placeholders/cardImage.png" />
      <CardInfoView></CardInfoView>
    </TouchableOpacity>
  );
}

/**
 * 카드 컴포넌트의 썸네일 영역
 * @param props
 * @returns
 */
function CardThumbnailView(props: { uri: string }) {
  return (
    <View style={styles.thumbnailView} testID="cardThumbnailView">
      <Image
        testID="cardThumbnailImage"
        style={styles.videoThumbnailImage}
        source={require("../../../potato/placeholders/cardImage.png")}
      ></Image>
      <Text testID="cardThumbnailTime" style={styles.videoTime}>
        0:00
      </Text>
      <TouchableOpacity
        testID="cardThumbnailButton"
        onPress={() => 0}
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
