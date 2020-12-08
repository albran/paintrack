import React from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Tutorial = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  return (
    <View style={{ ...styles.container, marginTop: height * 0.04 }}>
      <View style={styles.contentContainer}>
        <Text style={styles.swipe}>Swipe down to close</Text>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.text}>
          This tool offers visual tracking of pelvic pain associated with
          endometriosis by drawing pain locations on an abstract representation
          of the pelvis. Activities known to cause pain in relation to a
          diagnosis of endometriosis can also be tracked. The intention of this
          tool is not to anatomically pinpoint exactly what in your body is
          causing pain, but to get a sense of where and how you experience pain
          so that you can identify your pain patterns and communicate them with
          others.
        </Text>
        <Text style={styles.text}>
          A tracking period is a 24-hour day, so at the beginning of each day
          the tracking screen will be reset. You can track pain as soon as you
          experience it, or at a desginated time during the day, or a
          combination of both. To access previous dates, press the calendar
          button and select the relevant date.{" "}
        </Text>
        <View style={styles.factorsButton}>
          <AntDesign name="calendar" size={20} color="white" />
        </View>
        <Text style={styles.text}>
          Any tracking period can be edited retroactively, so if you forget to
          track but still remember how it felt you can still record it.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "90%",
  },
  swipe: {
    position: "absolute",
    top: 10,
  },
  title: {
    fontSize: 25,
    marginVertical: 5,
  },
  text: {
    textAlign: "center",
    marginVertical: 10,
  },
  factorsButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    aspectRatio: 1,
    borderRadius: 50 / 2,
    backgroundColor: "pink",
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: "cyan",
  },
});

export default Tutorial;
