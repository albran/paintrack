import React from "react";
import { StyleSheet, Pressable } from "react-native";

const BleedButton = ({
  style,
  icon,
  scale,
  selected,
  setSelected,
  updateFactors,
}) => {
  const onPress = () => {
    const update = selected === scale ? "none" : scale;
    setSelected(update);
    updateFactors({ do: "toggle", payload: { bleeding: update } });
  };
  return (
    <Pressable
      onPress={onPress}
      style={{
        ...styles.button,
        ...style,
        backgroundColor: scale === selected ? "red" : "gray",
      }}
    >
      {icon}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    aspectRatio: 1,
    borderRadius: 60 / 2,
  },
});

export default BleedButton;
