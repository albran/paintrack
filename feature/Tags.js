import React from "react";
import { View, StyleSheet } from "react-native";

import Tag from "./Tag";

const tagsModel = [
  { name: "Aching", color: "#0c451b" },
  { name: "Cramping", color: "#3f0063" },
  { name: "Stabbing", color: "#800101" },
  { name: "Shooting", color: "#756f00" },
  { name: "Burning", color: "#a35200" },
  { name: "Throbbing", color: "#000ea3" },
  { name: "Other", color: "#4d0087" },
];

const Tags = () => {
  return (
    <View style={styles.container}>
      {tagsModel.map((tag, i) => (
        <Tag key={i} text={tag.name} color={tag.color} />
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
    width: "80%",
  },
});

export default Tags;
