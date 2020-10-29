import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colorFromStroke from "../library/colorFromStroke";

const StrokeInfo = ({ infoStroke }) => {
  const { type, scale, pattern, note } = infoStroke;
  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.circle,
          backgroundColor: colorFromStroke(type, scale),
        }}
      >
        <Text style={styles.type}>{type}</Text>
        <Text style={styles.scale}>{scale}</Text>
        <Text style={styles.pattern}>{pattern}</Text>
        <Text style={styles.type}>Shallow</Text>
      </View>
      <View style={styles.note}>
        <Text>{note}</Text>
      </View>
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
    borderWidth: 1,
  },
});

export default StrokeInfo;
