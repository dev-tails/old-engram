export const primaryColor = "#3f50af";

const tintColorLight = "#2f95dc";
const tintColorDark = primaryColor;

const Colors = {
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#fff",
    background: "#303030",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
};

export default Colors;

export function getTextColor(theme: "light" | "dark") {
  return Colors[theme].text;
}

export function getBackgroundColor(theme: "light" | "dark") {
  return Colors[theme].background;
}

export function getTintColor(theme: "light" | "dark") {
  return Colors[theme].tint;
}
