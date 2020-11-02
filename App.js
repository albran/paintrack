import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Draw from "./feature/Draw";
import Calendar from "./feature/Calendar";
import Home from "./feature/Home";

const Stack = createStackNavigator();

export default function App() {
  const { width: winWidth, height: winHeight } = useWindowDimensions();
  return (
    // <View
    //   style={{
    //     ...styles.container,
    //     marginTop: winHeight * 0.04,
    //   }}
    // >
    //   {/* <Draw winWidth={winWidth} winHeight={winHeight} /> */}
    //   {/* <Calendar winWidth={winWidth} /> */}
    //   <Home />
    // </View>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" headerMode="none">
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
