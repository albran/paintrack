import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import RadioButton from "./RadioButton";
import colorShade from "../functions/colorShade";
import { Colors } from "./globals";

const generateButtons = (
  color,
  selection,
  setSelection,
  updateLiveStroke,
  setDrawState
) => {
  const buttons = [];
  for (let i = 1, j = 10, k = 0; i <= 10; i++, j--, k += 20) {
    buttons.unshift(
      <RadioButton
        key={i}
        number={j}
        color={colorShade(color, k)}
        selection={selection}
        setSelection={setSelection}
        updateLiveStroke={updateLiveStroke}
        setDrawState={setDrawState}
      />
    );
  }
  return buttons;
};

const Scale = ({ liveStroke, updateLiveStroke, setDrawState }) => {
  const color = colorShade(Colors[liveStroke.type], 0);
  const [selection, setSelection] = useState(1);
  const buttons = generateButtons(
    color,
    selection,
    setSelection,
    updateLiveStroke,
    setDrawState
  );
  return (
    <View style={styles.container}>
      <View style={styles.barWrapper}>
        <LinearGradient
          colors={[colorShade(color, 200), color]}
          start={[0, 0.5]}
          end={[1, 0.5]}
          style={styles.bar}
        />
      </View>
      {buttons}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "97%",
  },
  barWrapper: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bar: {
    height: 15,
    width: "90%",
    backgroundColor: "pink",
  },
});

export default Scale;
