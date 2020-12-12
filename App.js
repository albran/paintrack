import React, { useState } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Octicons } from "@expo/vector-icons";

import Draw from "./feature/Draw";
import Calendar from "./feature/Calendar";
import Tutorial from "./feature/Tutorial";
import getYYYYMMDD from "./library/getYYYYMMDD";
import TutorialDraw from "./feature/TutorialDraw";
import TutorialFactors from "./feature/TutorialFactors";

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "whitesmoke",
  },
};

export default function App() {
  const today = getYYYYMMDD(Date());
  const [date, setDate] = useState(today);

  const MainStackNavigator = () => (
    <MainStack.Navigator initialRouteName="Draw" headerMode="none">
      <MainStack.Screen name="Calendar">
        {(props) => <Calendar {...props} setDate={setDate} />}
      </MainStack.Screen>
      <MainStack.Screen name="Draw">
        {(props) => <Draw {...props} date={date} />}
      </MainStack.Screen>
    </MainStack.Navigator>
  );

  const ModalTabNavigator = () => (
    <Tab.Navigator
      backBehavior="none"
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          if (route.name === "Overview")
            return <AntDesign name="question" size={30} color="grey" />;
          if (route.name === "Tracking pain")
            return <Octicons name="pencil" size={24} color="grey" />;
          if (route.name === "Tracking factors")
            return <AntDesign name="book" size={24} color="grey" />;
        },
      })}
    >
      <Tab.Screen name="Overview" component={Tutorial} />
      <Tab.Screen name="Tracking pain" component={TutorialDraw} />
      <Tab.Screen name="Tracking factors" component={TutorialFactors} />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer theme={theme}>
      <RootStack.Navigator mode="modal" headerMode="none">
        <RootStack.Screen name="Main" component={MainStackNavigator} />
        <RootStack.Screen name="Tutorial" component={ModalTabNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
