import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Octicons } from "@expo/vector-icons";

import { DrawStates } from "../library/globals";

const Navigation = ({ setDrawState }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate("Tutorial")}
        style={styles.tutorial}
      >
        <AntDesign name="question" size={24} color="whitesmoke" />
      </Pressable>
      <View style={styles.buttonPanel}>
        <Pressable
          onPress={() => {
            setDrawState(DrawStates.Factoring);
          }}
          style={styles.factorsButton}
        >
          <AntDesign name="book" size={30} color="whitesmoke" />
        </Pressable>
        <Pressable
          onPress={() => {
            setDrawState(DrawStates.Pinching);
          }}
          style={styles.drawButton}
        >
          <Octicons name="pencil" size={60} color="whitesmoke" />
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Calendar")}
          style={styles.factorsButton}
        >
          <AntDesign name="calendar" size={30} color="whitesmoke" />
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
  tutorial: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 5,
    right: 15,
    width: 40,
    aspectRatio: 1,
    borderRadius: 40 / 2,
    backgroundColor: "pink",
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
