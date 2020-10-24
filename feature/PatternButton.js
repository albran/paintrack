import React from "react";
import { StyleSheet, Text, View } from "react-native";

const generateDots = (pattern) => {
  const n = pattern === "Brief" ? 1 : 5;
  const dots = [];
  for (let i = 0; i < n; i++) {
    dots.push(<View key={i} style={styles.dot} />);
  }
  return pattern === "Continuous" ? <View style={styles.dash} /> : dots;
};

const PatternButton = ({ text }) => {
  const dots = generateDots(text);
  return (
    <View style={styles.button}>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.dotDashWrapper}>{dots}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 60,
    borderWidth: 1,
    borderRadius: 20,
  },
  text: {
    fontSize: 18,
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
    backgroundColor: "black",
  },
  dash: {
    width: 45,
    height: 7,
    borderRadius: 20,
    backgroundColor: "black",
  },
});

export default PatternButton;
