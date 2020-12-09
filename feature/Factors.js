import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";

import { DrawStates } from "../library/globals";
import BleedScale from "./BleedScale";
import FactorButton from "./FactorButton";

const Factors = ({ setDrawState, factors, updateFactors, saveFactors }) => {
  const labels = ["sex", "one", "two"];
  const icons = [
    <Ionicons name="ios-bed" size={24} color="whitesmoke" />,
    <FontAwesome5 name="water" size={24} color="whitesmoke" />,
    <FontAwesome5 name="poop" size={24} color="whitesmoke" />,
  ];

  const closeAndSave = () => {
    saveFactors();
    setDrawState(DrawStates.Navigating);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonPanel}>
        {labels.map((label, i) => (
          <FactorButton
            key={i}
            icon={icons[i]}
            label={label}
            value={factors[label]}
            updateFactors={updateFactors}
            style={styles.button}
          />
        ))}
      </View>
      <BleedScale value={factors.bleeding} updateFactors={updateFactors} />
      <Pressable onPress={closeAndSave} style={styles.xButton}>
        <Entypo name="cross" size={24} color="whitesmoke" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  buttonPanel: {
    flexDirection: "row",
    marginVertical: 5,
  },
  button: {
    marginHorizontal: 5,
  },
  xButton: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 5,
    right: 15,
    width: 40,
    aspectRatio: 1,
    borderRadius: 60 / 2,
    backgroundColor: "pink",
  },
});

export default Factors;
