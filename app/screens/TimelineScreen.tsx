import {} from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getVideoCardData } from "../api/QueResourceUtils";
import VideoCardList from "../components/Lists/VideoCardList";
import VideoType from "../types/Video";

const TimelineScreen = () => {
  return (
    <SafeAreaView>
      <View testID="timelineScreen">
        <VideoCardList />
      </View>
    </SafeAreaView>
  );
};

export default TimelineScreen;
