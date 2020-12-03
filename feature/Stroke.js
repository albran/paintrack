import { Polyline } from "react-native-svg";
import React from "react";
import colorFromStroke from "../library/colorFromStroke";

const Stroke = ({ livePath, livePathWidth, stroke = {} }) => {
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
        points={points}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={type === "Undefined" ? 0.5 : 1}
      />
      {/* <Polyline
        points={points}
        stroke={color}
        strokeWidth={width - 5}
        strokeLinecap="round"
        strokeLinejoin="round"
      /> */}
      {pattern === "Periodical" && (
        <Polyline
          points={points}
          stroke="white"
          strokeWidth={5}
          strokeLinejoin="round"
          strokeDasharray="2, 10"
        />
      )}
      {pattern === "Continuous" && (
        <Polyline
          points={points}
          stroke="white"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      )}
    </>
  );
};

export default Stroke;
