import React from "react";
import { StyleSheet, Text, View } from "react-native";

const StrokeInfo = ({ infoStroke }) => {
  const { type, scale, pattern, note } = infoStroke;
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.type}>{type}</Text>
        <Text style={styles.scale}>{scale}</Text>
        <Text style={styles.pattern}>{pattern}</Text>
      </View>
      <View style={styles.note} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "pink",
  },
  circle: {
    justifyContent: "center",
    alignItems: "center",
    width: 125,
    height: 125,
    borderRadius: 125 / 2,
    backgroundColor: "cyan",
  },
  type: {
    color: "white",
  },
  scale: {
    color: "white",
    fontSize: 40,
  },
  pattern: {
    color: "white",
  },
  note: {
    width: "60%",
    height: "80%",
    backgroundColor: "cyan",
  },
});

export default StrokeInfo;
