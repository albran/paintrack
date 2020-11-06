import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { DrawStates } from "../library/globals";

const Navigation = ({ setDrawState }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.buttonPanel}>
        <Pressable
          onPress={() => {
            setDrawState(DrawStates.Factoring);
          }}
          style={styles.factorsButton}
        >
          <Text>F</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setDrawState(DrawStates.Pinching);
          }}
          style={styles.drawButton}
        >
          <Text>Draw</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Calendar")}
          style={styles.factorsButton}
        >
          <Text>C</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPanel: {
    flexDirection: "row",
    alignItems: "center",
  },
  drawButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    aspectRatio: 1,
    borderRadius: 120 / 2,
    backgroundColor: "pink",
    marginHorizontal: 10,
  },
  factorsButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    aspectRatio: 1,
    borderRadius: 80 / 2,
    backgroundColor: "pink",
  },
});

export default Navigation;
