import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import { DrawStates } from "../library/globals";

const Tag = ({ text, color, updateLiveStroke, setDrawState }) => {
  return (
    <Pressable
      hitSlop={3}
      style={({ pressed }) => [
        { opacity: pressed ? 0.66 : 1 },
        { backgroundColor: color },
        styles.container,
      ]}
      onPress={() => {
        setDrawState(DrawStates.Scaling);
        updateLiveStroke({ do: "append", props: { type: text } });
      }}
    >
      <Text style={{ ...styles.text }}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 17,
    margin: 5,
  },
  text: {
    fontSize: 24,
    color: "white",
    marginHorizontal: 15,
    marginVertical: 6,
  },
});

export default Tag;
