import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Draw from "./feature/Draw";
import Calendar from "./feature/Calendar";
import Home from "./feature/Home";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Draw" headerMode="none">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Calendar" component={Calendar} />
        <Stack.Screen name="Draw" component={Draw} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
