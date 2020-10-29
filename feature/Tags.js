import React from "react";
import { View, StyleSheet } from "react-native";

import Tag from "./Tag";
import colorFromStroke from "../library/colorFromStroke";

const tagsModel = [
  "Aching",
  "Cramping",
  "Stabbing",
  "Shooting",
  "Burning",
  "Throbbing",
  "Other",
];

const Tags = ({ updateLiveStroke, setDrawState }) => {
  return (
    <View style={styles.container}>
      {tagsModel.map((tag, i) => (
        <Tag
          key={i}
          text={tag}
          color={colorFromStroke(tag, 5)}
          updateLiveStroke={updateLiveStroke}
          setDrawState={setDrawState}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "90%",
  },
});

export default Tags;
