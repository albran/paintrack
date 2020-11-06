import React, { useEffect, useState } from "react";
import { StyleSheet, Pressable } from "react-native";

const FactorButton = ({ style, icon, factor, updateFactors }) => {
  const [selected, setSelected] = useState(false);

  const onPress = () => {
    setSelected(!selected);
  };

  useEffect(() => {
    updateFactors({ do: "toggle", payload: { [factor]: selected } });
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
    width: 60,
    aspectRatio: 1,
    borderRadius: 60 / 2,
  },
});

export default FactorButton;
