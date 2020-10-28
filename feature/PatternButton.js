import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import colorShade from "../library/colorShade";
import { Colors, DrawStates } from "../library/globals";

const generateDots = (pattern) => {
  const n = pattern === "Brief" ? 1 : 5;
  const dots = [];
  for (let i = 0; i < n; i++) {
    dots.push(<View key={i} style={styles.dot} />);
  }
  return pattern === "Continuous" ? <View style={styles.dash} /> : dots;
};

const PatternButton = ({
  text,
  liveStroke,
  updateLiveStroke,
  setDrawState,
}) => {
  const dots = generateDots(text);
  return (
    <Pressable
      onPress={() => {
        updateLiveStroke({ pattern: text });
        setDrawState(DrawStates.Noting);
      }}
      style={{
        ...styles.button,
        backgroundColor: colorShade(
          Colors[liveStroke.type],
          200 - (liveStroke.scale - 1) * 20
        ),
      }}
    >
      <Text style={styles.text}>{text}</Text>
      <View style={styles.dotDashWrapper}>{dots}</View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 50,
    borderRadius: 20,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  dotDashWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 7 / 2,
    margin: 1,
    borderWidth: 1,
    backgroundColor: "white",
  },
  dash: {
    width: 45,
    height: 7,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: "white",
  },
});

export default PatternButton;
