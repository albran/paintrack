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
import {
  AntDesign,
  Entypo,
  FontAwesome5,
  Fontisto,
  Ionicons,
} from "@expo/vector-icons";
import Constants from "expo-constants";

const TutorialFactors = ({ navigation }) => {
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
