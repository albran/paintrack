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
import Constants from "expo-constants";
import { Entypo, Octicons } from "@expo/vector-icons";

const steps = [
  `Pinch with two fingers to adjust the size of the stroke as indicated by the displayed circle.`,
  `Select the adjective that best describes your pain. Select 'Other' if you feel none of the descriptors fit how you feel.`,
  `Select the intensity of pain on the displayed scale, where 1 corresponds to the least noticible level of discomfort, and 10 corresponds to the worst pain imaginable. The stroke is updated to the corresponding descriptor color.`,
  `Select the pattern of recurrence that best describes how often you feel exactly the type pain.`,
  `Add a note describing anything else about the pain.`,
];

const step = (i, string) => (
  <View
    key={i}
    style={{ flexDirection: "row", width: "90%", marginVertical: 5 }}
  >
    <Text style={{ marginRight: 20 }}>{i + 1}</Text>
    <Text>{string}</Text>
  </View>
);

const TutorialDraw = ({ navigation }) => {
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
            <Entypo name="cross" size={10} color="white" />
          </Pressable>
        )}
      </View>
      <ScrollView
        contentContainerStyle={{
          ...styles.contentContainer,
        }}
      >
        <Text style={styles.title}>Tracking pain</Text>
        <Text style={styles.text}>
          Pain areas are indicated by adding 'strokes' to the model of the
          pelvis. Before drawing, navigate to the location on the model that
          best represents where the pain is coming from. Swipe in either
          direction with one finger to change between front and back views, and
          tap with two fingers to cycle between three levels of depth. The
          pelvic model will change in appearance betwen front and back views,
          and will slightly fade to reflect different depths. Once you have
          navigated to the appropriate view and depth, press the draw button to
          begin drawing a stroke.
        </Text>
        <View style={styles.factorsButton}>
          <Octicons name="pencil" size={20} color="white" />
        </View>
        <Text style={styles.text}>To draw a stroke:</Text>
        <View style={styles.steps}>
          {steps.map((string, i) => step(i, string))}
        </View>
        <Text style={styles.text}>
          After the note step, the tooltip will display stroke data for review.
          If something isn't correct, you can delete the stroke in order to
          re-record it.
        </Text>
        <Text style={styles.text}>
          You can access the stroke summary tooltip by clicking on any existing
          stroke from its model location.
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
  steps: {
    marginHorizontal: 15,
  },
});

export default TutorialDraw;
