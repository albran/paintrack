import React, { useState } from "react";
import { StyleSheet, Pressable } from "react-native";

const FactorButton = ({ style, icon, factor, updateFactors }) => {
  const [selected, setSelected] = useState(false);
  const onPress = () => {
    updateFactors({ do: "set", payload: { [factor]: !selected } });
    setSelected(!selected);
  };

  return (
    <Pressable
      onPress={onPress}
      style={{
        ...styles.button,
        ...style,
        backgroundColor: selected ? "red" : "gray",
      }}
    >
      {icon}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    aspectRatio: 1,
    borderRadius: 60 / 2,
  },
});

export default FactorButton;
