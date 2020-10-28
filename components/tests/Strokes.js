import React from "react";
import { useWindowDimensions } from "react-native";
import colorShade from "../../library/colorShade";
import Svg, { Polyline } from "react-native-svg";

const Strokes = () => {
  const { width, height, scale } = useWindowDimensions();
  console.log(` ${width}, ${height}, ${scale}`);
  const col1 = [];
  const col2 = [];
  const col3 = [];
  //#fc0303
  //#6e0000
  for (let i = 0, j = 0.1, k = 0; i < 10; i++, j += 0.05, k += 25) {
    col1.push({
      path: `${width * 0.05},${height * j} ${width * 0.35},${height * j}`,
      color: colorShade("#fc0303", k),
    });
    col2.push({
      path: `${width * 0.2},${height * j} ${width * 0.65},${height * j}`,
      color: colorShade("#db0000", k),
    });
    col3.push({
      path: `${width * 0.7},${height * j} ${width * 0.95},${height * j}`,
      color: colorShade("#fc0303", k),
    });
  }
  return (
    <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`}>
      {col1.map((stroke, i) => (
        <Polyline
          key={i}
          points={stroke.path}
          stroke={stroke.color}
          strokeWidth={15}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      {col2.map((stroke, i) => (
        <Polyline
          key={i}
          points={stroke.path}
          stroke={stroke.color}
          strokeWidth={15}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={0.8}
        />
      ))}
      {col3.map((stroke, i) => (
        <Polyline
          key={i}
          points={stroke.path}
          stroke={stroke.color}
          strokeWidth={15}
          // strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={0.6}
          strokeDasharray="4, 2"
        />
      ))}
    </Svg>
  );
};

export default Strokes;
