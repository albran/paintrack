import { Polyline } from "react-native-svg";
import React from "react";
import colorShade from "../functions/colorShade";

const Stroke = ({ path, strokeWidth }) => {
  const points = path.map((p) => `${p.x},${p.y}`).join(" ");

  // const color = "#54b946";
  const color = colorShade("#b94646", -30);

  return (
    <>
      <Polyline
        points={points}
        stroke="black"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Polyline
        points={points}
        stroke={color}
        strokeWidth={strokeWidth - 5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* <Polyline
        points={points}
        stroke="white"
        strokeWidth={strokeWidth - 10}
        strokeLinejoin="round"
        strokeDasharray="2, 10"
      /> */}
    </>
  );
};

export default Stroke;
