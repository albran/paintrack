import React from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import {
  AntDesign,
  FontAwesome5,
  Fontisto,
  Ionicons,
} from "@expo/vector-icons";

const TutorialFactors = () => {
  const { width, height } = useWindowDimensions();
  return (
    <View style={{ ...styles.container, marginTop: height * 0.04 }}>
      <View style={styles.contentContainer}>
        <Text style={styles.swipe}>Swipe down to close</Text>
        <Text style={styles.title}>Tracking factors</Text>
        <Text style={styles.text}>
          Activites that are known to cause pain in connection to endometriosis
          can be tracked via the "Factors" tooltip. Press the Factors button to
          access the tooltip.
        </Text>
        <View style={styles.button}>
          <AntDesign name="book" size={20} color="white" />
        </View>
        <Text style={styles.text}>
          The top row of factor buttons are for indicating if any pain has been
          experienced during three activities known to cause pain in relation to
          a diagnosis of endometriosis. Simply press each button to toggle
          selection.
        </Text>
        <View style={styles.buttonsWrapper}>
          <View style={styles.buttonContainer}>
            <View style={styles.factorsButton}>
              <Ionicons name="ios-bed" size={24} color="white" />
            </View>
            <Text style={styles.buttonText}>Painful sex</Text>
            <Text style={styles.buttonText}>(Dyspareunia)</Text>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.factorsButton}>
              <FontAwesome5 name="water" size={24} color="white" />
            </View>
            <Text style={styles.buttonText}>Painful urination</Text>
            <Text style={styles.buttonText}>(Dysuria)</Text>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.factorsButton}>
              <FontAwesome5 name="poop" size={24} color="white" />
            </View>
            <Text style={styles.buttonText}>Painful defecation</Text>
            <Text style={styles.buttonText}>(Dyschezia)</Text>
          </View>
        </View>
        <Text style={styles.text}>
          The bottom row of buttons are for indicating flow and if you
          experience pain during flow. Press once to indicate a flow amount
          without pain, or twice to indicate with pain. Pressing a third time
          will deselect. No selection indicates you are not experiencing flow.
        </Text>
        <View style={styles.buttonsWrapper}>
          <View style={styles.buttonContainer}>
            <View style={styles.bleedButton}>
              <Fontisto name="blood-drop" size={15} color="white" />
            </View>
            <Text style={styles.buttonText}>Spotting</Text>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.bleedButton}>
              <Fontisto name="blood-drop" size={15} color="white" />
              <Fontisto name="blood-drop" size={15} color="white" />
            </View>
            <Text style={styles.buttonText}>Light</Text>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.bleedButton}>
              <Fontisto name="blood-drop" size={15} color="white" />
              <Fontisto name="blood-drop" size={15} color="white" />
              <Fontisto name="blood-drop" size={15} color="white" />
            </View>
            <Text style={styles.buttonText}>Heavy</Text>
          </View>
        </View>
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
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    aspectRatio: 1,
    borderRadius: 50 / 2,
    backgroundColor: "pink",
  },
  buttonsWrapper: {
    justifyContent: "space-around",
    width: "80%",
    flexDirection: "row",
    marginVertical: 5,
  },
  buttonContainer: {
    width: 100,
    alignItems: "center",
  },
  factorsButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    aspectRatio: 1,
    borderRadius: 50 / 2,
    backgroundColor: "grey",
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 10,
  },
  bleedButton: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: 50,
    aspectRatio: 1,
    borderRadius: 50 / 2,
    backgroundColor: "grey",
    marginBottom: 5,
  },
});

export default TutorialFactors;
