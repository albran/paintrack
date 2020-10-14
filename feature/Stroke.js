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
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.75}
      />
      {/* <Polyline
        points={points}
        stroke="white"
        strokeWidth={strokeWidth - 1}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.5}
      /> */}
    </>
  );
};

export default Stroke;
