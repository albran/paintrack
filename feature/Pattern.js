import React from "react";
import { StyleSheet, View } from "react-native";

import PatternButton from "./PatternButton";

const patterns = ["Brief", "Periodical", "Continuous"];

const Pattern = ({
  liveStroke,
  updateLiveStroke,
  setDrawState,
  lsstate,
  dispatch,
}) => {
  return (
    <View style={styles.container}>
      {patterns.map((pattern, i) => (
        <PatternButton
          key={i}
          text={pattern}
          liveStroke={liveStroke}
          updateLiveStroke={updateLiveStroke}
          setDrawState={setDrawState}
          lsstate={lsstate}
          dispatch={dispatch}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "95%",
    height: 175,
  },
});

export default Pattern;
