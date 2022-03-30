import {} from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import VideoCardList from "../components/Lists/VideoCardList";

function TimelineScreen() {
  return (
    <SafeAreaView style={styles.container} testID="timelineScreen">
      <VideoCardList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});

export default TimelineScreen;
