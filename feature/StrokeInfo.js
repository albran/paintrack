import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import colorFromStroke from "../library/colorFromStroke";

import { DrawStates } from "../library/globals";

const StrokeInfo = ({
  stroke,
  drawState,
  setDrawState,
  liveStroke,
  updateLiveStroke,
  updateStrokes,
}) => {
  const { type, scale, pattern, note, i = -1 } = stroke;
  return (
    <View style={styles.container}>
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
        <View>
          <Pressable
            onPress={() => {
              drawState === DrawStates.Reviewing &&
                updateStrokes({ do: "append", payload: liveStroke });
              updateLiveStroke({ do: "delete" });
              setDrawState(DrawStates.Navigating);
            }}
            style={styles.x}
          >
            <Text>X</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setDrawState(DrawStates.Navigating);
              i > -1 && updateStrokes({ do: "delete", i: i });
              updateLiveStroke({ do: "delete" });
            }}
            style={styles.x}
          >
            <Text>D</Text>
          </Pressable>
        </View>
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
    width: "45%",
    height: "60%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
  },
  x: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: "pink",
    marginVertical: 10,
  },
});

export default StrokeInfo;
