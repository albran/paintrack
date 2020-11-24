import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

const Tutorial = ({ navigation }) => (
  <View style={styles.container}>
    <Pressable onPress={() => navigation.goBack()} style={styles.button} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "pink",
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: "cyan",
  },
});

export default Tutorial;
