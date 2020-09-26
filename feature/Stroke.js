import Svg, { Polyline } from "react-native-svg";
import React from "react";

const Stroke = ({ path, strokeWidth, width, height }) => {
  // const { width, height } = useWindowDimensions();
  const points = path.map((p) => `${p.x},${p.y}`).join(" ");
  return (
    <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`}>
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
    </Svg>
  );
};

export default Stroke;
