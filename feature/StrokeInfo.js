import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import colorFromStroke from "../library/colorFromStroke";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

import { DrawStates } from "../library/globals";

const StrokeInfo = ({
  liveStroke,
  drawState,
  setDrawState,
  updateLiveStroke,
  saveStroke,
  deleteStroke,
}) => {
  const { type, scale, pattern, depth, note, i = -1 } = liveStroke;

  const closeAndSave = () => {
    drawState === DrawStates.Reviewing && saveStroke();
    setDrawState(DrawStates.Navigating);
    updateLiveStroke({ do: "delete" });
  };

  //todo: delete from memory
  const closeAndDelete = () => {
    setDrawState(DrawStates.Navigating);
    i > -1 && deleteStroke(i);
    updateLiveStroke({ do: "delete" });
  };

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
          <Text style={styles.type}>
            {depth === 0 ? "Surface" : depth === 1 ? "Shallow" : "Deep"}
          </Text>
        </View>
        <View style={styles.note}>
          <Text>{note}</Text>
        </View>
        <View>
          <Pressable onPress={closeAndSave} style={styles.x}>
            <FontAwesome name="save" size={20} color="white" />
          </Pressable>
          <Pressable onPress={closeAndDelete} style={styles.x}>
            <AntDesign name="delete" size={20} color="white" />
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
