import { Polyline } from "react-native-svg";
import React from "react";

const Stroke = ({ path, strokeWidth }) => {
  const points = path.map((p) => `${p.x},${p.y}`).join(" ");
  return (
    <>
      <Polyline
        points={points}
        stroke="black"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.25}
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
