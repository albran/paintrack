import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { DrawStates } from "../library/globals";
import BleedScale from "./BleedScale";
import FactorButton from "./FactorButton";

const Factors = ({
  setDrawState,
  factors,
  setFactors,
  updateFactors,
  saveDay,
}) => {
  const labels = ["sex", "one", "two"];

  return (
    <View style={styles.container}>
      <View style={styles.buttonPanel}>
        {labels.map((label, i) => (
          <FactorButton
            key={i}
            factor={label}
            updateFactors={updateFactors}
            style={styles.button}
          />
        ))}
      </View>
      <BleedScale updateFactors={updateFactors} />
      <Pressable
        onPress={() => {
          saveDay();
          setDrawState(DrawStates.Navigating);
        }}
        style={styles.xButton}
      />
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
    position: "absolute",
    top: 5,
    right: 15,
    width: 35,
    aspectRatio: 1,
    borderRadius: 60 / 2,
    backgroundColor: "pink",
  },
});

export default Factors;
