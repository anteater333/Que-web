// VideoPlayer.subset.tsx
/**
 * 비디오 플레이어에 공통적으로 사용되는 하위 컴포넌트들의 모음집입니다.
 */

import {
  ActivityIndicator,
  Animated,
  LayoutChangeEvent,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styles, {
  heartPositionBuilder,
  iconStyles,
  sliderStyle,
} from "./VideoPlayer.style";
import { MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import VideoType from "../../types/Video";
import { useCallback, useEffect, useRef, useState } from "react";
import { HEART_COLOR_TIMER } from "./VideoPlayer.global";
import LikeType from "../../types/Like";
import RoundedButton from "../buttons/RoundedButton";

/** 비디오 플레이어 프로퍼티 타입 */
export interface VideoPlayerProps {
  /** 이 프로퍼티에서는 비디오 메타 정보만 사용합니다. 비디오 원본 주소는 videoSource 프로퍼티로 전달해야 합니다. */
  videoData: VideoType;
  /** 비디오 원본 주소 입니다. */
  videoSource: string;
}

/** 중앙 버튼 */
export function VideoMiddleController(props: {
  isBuffering: boolean;
  isControlHidden: boolean;
  togglePlay: () => void;
  isPlaying: boolean;
  didJustFinish: boolean;
}) {
  return (
    <>
      {props.isBuffering ? (
        <ActivityIndicator
          size={styles.videoBufferIndicator.fontSize}
          color={styles.videoBufferIndicator.color}
          style={styles.videoBigButton}
        />
      ) : !props.isControlHidden ? (
        <View>
          <Pressable onPress={props.togglePlay}>
            <MaterialIcons
              style={styles.videoBigButton}
              selectable={false}
              color={iconStyles.color}
              size={iconStyles.sizeXXlarge}
              name={
                props.isPlaying
                  ? "pause"
                  : props.didJustFinish
                  ? "replay"
                  : "play-arrow"
              }
            />
          </Pressable>
        </View>
      ) : null}
    </>
  );
}

/** 애니메이션 적용 가능한 MaterialIcons 컴포넌트, 추후 코드 분리 필요 */
const AnimatedMaterialIcon = Animated.createAnimatedComponent(MaterialIcons);

type VideoLikeType =
  | { useLikes?: false }
  | { useLikes: true; onLike: () => void; likesData: LikeType[] };

type VideoBottomControllerPropType = {
  togglePlay: () => void;
  isPlaying: boolean;
  didJustFinish: boolean;
  videoPosition: number;
  videoLength: number;
  seekVideo: (position: number) => void;
} & VideoLikeType;

/** 하단 재생바 */
export function VideoBottomController(props: VideoBottomControllerPropType) {
  // TBD Web 대응 마우스 호버시에만 컨트롤러 표시되도록 만들기

  // TBD 하트 모양 버튼을 위한 스타일 만들기
  const [sliderWidth, setSliderWidth] = useState<number>(0);

  const getSliderWidth = useCallback((event: LayoutChangeEvent) => {
    setSliderWidth(event.nativeEvent.layout.width);
  }, []);

  useEffect(() => {
    console.log(sliderWidth);
  }, [sliderWidth]);

  /** 버튼 색상 변경 애니메이션 재료들 */
  const animation = useRef(new Animated.Value(0)).current;
  const colorFadeInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [iconStyles.color, iconStyles.heartColor],
  });

  /** 버튼 터치 시 색상 변경 fade 애니메이션 사용 */
  const handleButtonColorAnimation = useCallback(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: HEART_COLOR_TIMER / 2,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(animation, {
        toValue: 1,
        duration: HEART_COLOR_TIMER * 5,
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(animation, {
          toValue: 0,
          duration: HEART_COLOR_TIMER,
          useNativeDriver: false,
        }).start();
      });
    });
  }, [animation]);

  return (
    <TouchableWithoutFeedback>
      <View style={styles.videoBottomControllerContainer}>
        <Pressable onPress={props.togglePlay}>
          <MaterialIcons
            style={styles.videoSmallButton}
            selectable={false}
            color={iconStyles.color}
            size={iconStyles.sizeXlarge}
            name={
              props.isPlaying
                ? "pause"
                : props.didJustFinish
                ? "replay"
                : "play-arrow"
            }
          />
        </Pressable>
        <View onLayout={getSliderWidth} style={styles.videoSliderContainer}>
          <View style={styles.videoHeartArea}>
            {/* TBD 컴포넌트 분리 */}
            <View
              style={[
                styles.videoHeartIndicatorContainer,
                heartPositionBuilder(
                  props.videoLength,
                  props.videoLength,
                  sliderWidth
                ),
              ]}
            >
              <Text numberOfLines={1} style={styles.videoHeartIndicatorText}>
                3:04
              </Text>
              <MaterialIcons
                style={styles.videoHeartIndicatorIcon}
                name="favorite"
              ></MaterialIcons>
            </View>
          </View>
          <Slider
            style={styles.videoSlider}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor={sliderStyle.default.color}
            maximumTrackTintColor={sliderStyle.default.color}
            thumbTintColor={sliderStyle.default.tintColor}
            value={props.videoPosition / props.videoLength}
            onSlidingComplete={props.seekVideo}
          />
        </View>
        {props.useLikes ? (
          <Pressable
            onPress={() => {
              handleButtonColorAnimation();
              props.onLike();
            }}
          >
            <AnimatedMaterialIcon
              style={[
                styles.videoSmallButton,
                { color: colorFadeInterpolation },
              ]}
              size={iconStyles.sizeXlarge}
              selectable={false}
              name={"favorite"}
            />
          </Pressable>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
}
