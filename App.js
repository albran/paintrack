import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Draw from "./feature/Draw";
import Calendar from "./feature/Calendar";
import getYYYYMMDD from "./library/getYYYYMMDD";

const Stack = createStackNavigator();

export default function App() {
  const today = getYYYYMMDD(Date());
  const [date, setDate] = useState(today);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Draw" headerMode="none">
        <Stack.Screen name="Calendar">
          {(props) => <Calendar {...props} setDate={setDate} />}
        </Stack.Screen>
        <Stack.Screen name="Draw">
          {(props) => <Draw {...props} date={date} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
