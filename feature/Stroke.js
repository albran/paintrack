import { Polyline } from "react-native-svg";
import React from "react";
import colorFromStroke from "../library/colorFromStroke";

const Stroke = ({
  livePath,
  livePathWidth,
  stroke = {},
  onPress,
  opacity = 1,
}) => {
  const {
    path = livePath,
    width = livePathWidth,
    type = "Undefined",
    scale = 1,
    pattern,
  } = stroke;

  const points = path.map((p) => `${p.x},${p.y}`).join(" ");
  const color = colorFromStroke(type, scale);

  return (
    <>
      <Polyline
        onPress={onPress}
        points={points}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={type === "Undefined" ? 0.5 : opacity}
      />
      {pattern === "Periodical" && (
        <Polyline
          points={points}
          stroke="whitesmoke"
          strokeWidth={5}
          strokeLinejoin="round"
          strokeDasharray="2, 10"
        />
      )}
      {pattern === "Continuous" && (
        <Polyline
          points={points}
          stroke="whitesmoke"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      )}
    </>
  );
};

export default Stroke;
