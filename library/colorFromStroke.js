import colorShade from "./colorShade";
import { Colors } from "./globals";

export default colorFromStroke = (type, scale) => {
  return type === "Undefined"
    ? "black"
    : colorShade(Colors[type], 180 - (scale - 1) * 20);
};
