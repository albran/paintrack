import React from "react";
import { StyleSheet, View } from "react-native";

import PatternButton from "./PatternButton";

const patterns = ["Brief", "Periodical", "Continuous"];

const Pattern = ({ liveStroke, updateLiveStroke, setDrawState }) => {
  return (
    <View style={styles.container}>
      {patterns.map((pattern, i) => (
        <PatternButton
          key={i}
          text={pattern}
          liveStroke={liveStroke}
          updateLiveStroke={updateLiveStroke}
          setDrawState={setDrawState}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    height: 100,
  },
});

export default Pattern;
