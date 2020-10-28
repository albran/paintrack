import { Polyline } from "react-native-svg";
import React from "react";
import colorShade from "../library/colorShade";
import { Colors } from "../library/globals";

const Stroke = ({ livePath, liveStrokeWidth, stroke = {} }) => {
  const {
    path = livePath,
    width = liveStrokeWidth,
    type = "Undefined",
    scale = 1,
    pattern,
  } = stroke;

  const points = path.map((p) => `${p.x},${p.y}`).join(" ");
  const color =
    type === "Undefined"
      ? "white"
      : colorShade(Colors[type], 200 - (scale - 1) * 20);

  return (
    <>
      <Polyline
        points={points}
        stroke="black"
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Polyline
        points={points}
        stroke={color}
        strokeWidth={width - 5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
