import { Dimensions, useWindowDimensions } from "react-native";
import Svg, { Polyline } from "react-native-svg";
import React, { useRef, useState } from "react";

const Stroke = ({ path, width, height }) => {
  // const { width, height } = useWindowDimensions();
  const points = path.map((p) => `${p.x},${p.y}`).join(" ");
  return (
    <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`}>
      <Polyline
        points={points}
        fill="transparent"
        stroke="black"
        strokeWidth={50}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Polyline
        points={points}
        fill="transparent"
        stroke="white"
        strokeWidth={45}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Stroke;
