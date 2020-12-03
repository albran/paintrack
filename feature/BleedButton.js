import React from "react";
import { StyleSheet, Pressable } from "react-native";

const BleedButton = ({
  style,
  icon,
  bleedValue,
  selected,
  setSelected,
  updateFactors,
}) => {
  const painfuBleedValue = "painful " + bleedValue;
  const onPress = () => {
    const update =
      selected === bleedValue
        ? painfuBleedValue
        : selected === painfuBleedValue
        ? "none"
        : bleedValue;
    setSelected(update);
    updateFactors({ do: "toggle", payload: { bleeding: update } });
  };

  return (
    <Pressable
      onPress={onPress}
      style={{
        ...styles.button,
        ...style,
        backgroundColor: selected === painfuBleedValue ? "red" : "grey",
        borderWidth: selected === bleedValue ? 5 : 0,
        borderColor: bleedValue && "red",
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
