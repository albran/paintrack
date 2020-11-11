import React, { useEffect, useState } from "react";
import { StyleSheet, Pressable } from "react-native";

const FactorButton = ({ style, icon, label, updateFactors, value }) => {
  const [selected, setSelected] = useState(false);

  const onPress = () => {
    setSelected(!selected);
  };

  useEffect(() => {
    setSelected(value);
  }, []);

  useEffect(() => {
    updateFactors({ do: "toggle", payload: { [label]: selected } });
  }, [selected]);

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
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: 60,
    aspectRatio: 1,
    borderRadius: 60 / 2,
  },
});

export default FactorButton;
