import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import BleedButton from "./BleedButton";

const BleedScale = ({ value, updateFactors }) => {
  const [selected, setSelected] = useState("none");
  const bleedValues = ["spotting", "light", "heavy"];

  useEffect(() => {
    setSelected(value);
  }, []);

  return (
    <View style={styles.container}>
      {bleedValues.map((val, i) => (
        <BleedButton
          key={i}
          scale={val}
          style={styles.button}
          selected={selected}
          setSelected={setSelected}
          updateFactors={updateFactors}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  button: {
    marginHorizontal: 5,
  },
});

export default BleedScale;