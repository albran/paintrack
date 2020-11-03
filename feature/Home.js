import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        <Pressable style={styles.button}>
          <Text>Record for today</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Calendar")}
          style={styles.button}
        >
          <Text>Calendar</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  buttonWrapper: {
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: "25%",
  },
  button: {
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",
    height: "40%",
    borderRadius: 20,
    backgroundColor: "pink",
  },
});

export default Home;
