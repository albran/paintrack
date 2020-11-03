import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { DrawStates } from "../library/globals";

const Factors = ({ setDrawState }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonPanel}>
        <Pressable style={styles.button} />
        <Pressable style={styles.button} />
        <Pressable style={styles.button} />
      </View>
      <View style={styles.buttonPanel}>
        <Pressable style={styles.button} />
        <Pressable style={styles.button} />
        <Pressable style={styles.button} />
      </View>
      <Pressable
        onPress={() => setDrawState(DrawStates.Navigating)}
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
    width: 60,
    aspectRatio: 1,
    borderRadius: 60 / 2,
    backgroundColor: "pink",
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
