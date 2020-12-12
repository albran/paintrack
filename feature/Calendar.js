import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Calendar as RNCcalendar } from "react-native-calendars";

import getYYYYMMDD from "../library/getYYYYMMDD";

const Calendar = ({ navigation, setDate }) => {
  const winWidth = useWindowDimensions().width;
  const goToDay = (day) => {
    setDate(day.dateString);
    navigation.navigate("Draw");
  };

  return (
    <View style={styles.container}>
      <View style={{ ...styles.contentWrapper, width: 0.9 * winWidth }}>
        <RNCcalendar
          firstDay={1}
          maxDate={getYYYYMMDD(Date())}
          hideExtraDays={true}
          enableSwipeMonths={true}
          onDayPress={(day) => {
            goToDay(day);
          }}
          theme={{
            textMonthFontSize: 24,
            textDayHeaderFontSize: 14,
            textDayFontSize: 20,
            calendarBackground: "whitesmoke",
          }}
          style={{ width: 0.9 * winWidth, backgroundColor: "whitesmoke" }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "whitesmoke",
  },
  contentWrapper: {
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default React.memo(Calendar);
