import React from "react";
import { View, StyleSheet } from "react-native";

import Tag from "./Tag";

const tagsModel = [
  { name: "Dull", color: "green" },
  { name: "Sharp", color: "pink" },
  { name: "Stabbing", color: "red" },
  { name: "Throbbing", color: "blue" },
  { name: "Other", color: "purple" },
];

const Tags = () => {
  return (
    <View style={styles.container}>
      {tagsModel.map((tag, i) => (
        <Tag key={i} text={tag.name} />
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
