import React from "react";
import { StyleSheet, View } from "react-native";
import { Calendar as RNCalendar } from "react-native-calendars";

import getYYYYMMDD from "../library/getYYYYMMDD";

const Calendar = ({ winWidth }) => {
  const getDate = (date) => {};

  return (
    <View style={styles.container}>
      <RNCalendar
        firstDay={1}
        maxDate={getYYYYMMDD(Date())}
        hideExtraDays={true}
        hideArrows={true}
        enableSwipeMonths={true}
        onDayPress={(day) => {
          console.log(day);
        }}
        theme={{
          textMonthFontSize: 24,
          textDayHeaderFontSize: 14,
          textDayFontSize: 20,
        }}
        style={{ width: 0.9 * winWidth }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: "pink",
  },
});

export default Calendar;
