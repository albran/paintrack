import React from "react";
import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Constants from "expo-constants";

const Tutorial = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.swipeContainer}>
        {Platform.OS === "ios" && (
          <Text style={styles.swipe}>Swipe down here to close</Text>
        )}
        {Platform.OS === "android" && (
          <Pressable
            onPress={() => {
              navigation.popToTop();
            }}
            style={styles.androidClose}
          >
            <Entypo name="cross" size={10} color="whitesmoke" />
          </Pressable>
        )}
      </View>
      <ScrollView
        contentContainerStyle={{
          ...styles.contentContainer,
        }}
      >
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
          <AntDesign name="calendar" size={20} color="whitesmoke" />
        </View>
        <Text style={styles.text}>
          Any tracking period can be edited retroactively, so if you forget to
          track but still remember how it felt you can still record it.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  contentContainer: {
    alignItems: "center",
  },
  swipeContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  androidClose: {
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    aspectRatio: 1,
    borderRadius: 20 / 2,
    backgroundColor: "grey",
  },
  swipe: {
    fontSize: 10,
    color: "grey",
  },
  title: {
    fontSize: 25,
    marginVertical: 5,
  },
  text: {
    textAlign: "center",
    marginVertical: 10,
    marginHorizontal: 20,
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
