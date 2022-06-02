// VideoPlayer.subset.tsx
/**
 * 비디오 플레이어에 공통적으로 사용되는 하위 컴포넌트들의 모음집입니다.
 */

import {
  ActivityIndicator,
  Animated,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styles, { iconStyles } from "./VideoPlayer.style";
import { MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import VideoType from "../../types/Video";
import { useCallback, useRef } from "react";
import { HEART_COLOR_TIMER } from "./VideoPlayer.global";

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

/** 하단 재생바 */
export function VideoBottomController(
  props:
    | {
        togglePlay: () => void;
        isPlaying: boolean;
        didJustFinish: boolean;
        videoPosition: number;
        videoLength: number;
        seekVideo: (position: any) => void;
        useLikes?: false;
      }
    | {
        togglePlay: () => void;
        isPlaying: boolean;
        didJustFinish: boolean;
        videoPosition: number;
        videoLength: number;
        seekVideo: (position: any) => void;
        useLikes: true;
        onLike: () => void;
      }
) {
  // TBD Web 대응 마우스 호버시에만 컨트롤러 표시되도록 만들기

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
        <View style={styles.videoSliderContainer}>
          <Slider
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor={styles.videoSlider.color}
            maximumTrackTintColor={styles.videoSlider.color}
            thumbTintColor={styles.videoSlider.color}
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
