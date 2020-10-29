import { Polyline } from "react-native-svg";
import React from "react";
import colorFromStroke from "../library/colorFromStroke";

const Stroke = ({ livePath, liveStrokeWidth, stroke = {}, opacity = 1 }) => {
  const {
    path = livePath,
    width = liveStrokeWidth,
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
        stroke="black"
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={opacity}
      />
      <Polyline
        points={points}
        stroke={color}
        strokeWidth={width - 5}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={opacity}
      />
      {pattern === "Periodical" && (
        <Polyline
          points={points}
          stroke="white"
          strokeWidth={5}
          strokeLinejoin="round"
          strokeDasharray="2, 10"
          opacity={opacity}
        />
      )}
      {pattern === "Continuous" && (
        <Polyline
          points={points}
          stroke="white"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity={opacity}
        />
      )}
    </>
  );
};

export default Stroke;
