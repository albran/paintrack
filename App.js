import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Draw from "./feature/Draw";
import Calendar from "./feature/Calendar";
import Tutorial from "./feature/Tutorial";
import getYYYYMMDD from "./library/getYYYYMMDD";

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

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

  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal" headerMode="none">
        <RootStack.Screen name="Main" component={MainStackNavigator} />
        <RootStack.Screen name="Tutorial" component={Tutorial} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
