import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import BleedButton from "./BleedButton";
import { Fontisto } from "@expo/vector-icons";

const BleedScale = ({ value, updateFactors }) => {
  const [selected, setSelected] = useState("none");
  const bleedValues = ["spotting", "light", "heavy"];
  const icon = <Fontisto name="blood-drop" size={15} color="white" />;

  const generateIcons = (j) => {
    let icons = [icon];
    for (let i = 1; i <= j; i++) icons.push(icon);
    return <View style={{ flexDirection: "row" }}>{icons}</View>;
  };

  useEffect(() => {
    setSelected(value);
  }, []);

  return (
    <View style={styles.container}>
      {bleedValues.map((val, i) => (
        <BleedButton
          key={i}
          icon={generateIcons(i)}
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
