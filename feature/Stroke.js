import { Polyline } from "react-native-svg";
import React from "react";

const Stroke = ({ path, strokeWidth }) => {
  const points = path.map((p) => `${p.x},${p.y}`).join(" ");
  return (
    <>
      <Polyline
        points={points}
        fill="transparent"
        stroke="black"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Polyline
        points={points}
        fill="transparent"
        stroke="white"
        strokeWidth={strokeWidth - 1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  );
};

export default Stroke;
