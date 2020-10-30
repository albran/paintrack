import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import colorFromStroke from "../library/colorFromStroke";

import { DrawStates } from "../library/globals";

const StrokeInfo = ({ stroke, setDrawState, updateLiveStroke }) => {
  const { type, scale, pattern, note } = stroke;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Touch above to close tooltip.</Text>
      </View>
      <View style={styles.infoWrapper}>
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
        <Pressable
          onPress={() => {
            setDrawState(DrawStates.Navigating);
            updateLiveStroke({ do: "delete" });
          }}
          style={styles.x}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  header: {},
  infoWrapper: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  circle: {
    justifyContent: "center",
    alignItems: "center",
    width: 125,
    height: 125,
    borderRadius: 125 / 2,
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
    width: "50%",
    height: "60%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  x: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: "cyan",
  },
});

export default StrokeInfo;
