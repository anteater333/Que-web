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
      <View style={styles.container} testID="timelineScreen">
        <VideoCardList />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 480,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TimelineScreen;
