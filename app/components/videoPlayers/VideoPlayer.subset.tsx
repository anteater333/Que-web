// VideoPlayer.subset.tsx
/**
 * 비디오 플레이어에 공통적으로 사용되는 하위 컴포넌트들의 모음집입니다.
 */

import { ActivityIndicator, Pressable, View } from "react-native";
import styles from "./VideoPlayer.style";
import { MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import VideoType from "../../types/Video";

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

/** 하단 재생바 */
export function VideoBottomController(props: {
  togglePlay: () => void;
  isPlaying: boolean;
  didJustFinish: boolean;
  videoPosition: number;
  videoLength: number;
  seekVideo: (position: any) => void;
}) {
  // TBD Web 대응 마우스 호버시에만 컨트롤러 표시되도록 만들기
  return (
    <>
      <Pressable onPress={props.togglePlay}>
        <MaterialIcons
          style={styles.videoSmallButton}
          selectable={false}
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
    </>
  );
}
