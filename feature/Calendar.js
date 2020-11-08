import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Calendar as RNCcalendar } from "react-native-calendars";

import getYYYYMMDD from "../library/getYYYYMMDD";

const Calendar = ({ navigation, setDate }) => {
  const winWidth = useWindowDimensions().width;
  return (
    <View style={styles.container}>
      <View style={{ ...styles.contentWrapper, width: 0.9 * winWidth }}>
        <RNCcalendar
          firstDay={1}
          maxDate={getYYYYMMDD(Date())}
          hideExtraDays={true}
          hideArrows={true}
          enableSwipeMonths={true}
          onDayPress={(day) => {
            // console.log(day.dateString);
            setDate(day.dateString);
            navigation.navigate("Draw");
          }}
          theme={{
            textMonthFontSize: 24,
            textDayHeaderFontSize: 14,
            textDayFontSize: 20,
          }}
          style={{ width: 0.9 * winWidth }}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Draw")}
          style={styles.button}
        >
          <Text>Draw</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "white",
  },
  contentWrapper: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 100,
    borderRadius: 20,
    backgroundColor: "pink",
  },
});

export default React.memo(Calendar);
