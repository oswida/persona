import { globalStyle, style } from "@vanilla-extract/css";
import { sprinkles, themeVars } from "./common";

globalStyle("html, body", {
  margin: 0,
  padding: 0,
});

globalStyle("*, *:before, *:after", {
  boxSizing: "border-box",
});

export const appStyle = style([
  sprinkles({ backgroundColor: "background", color: "primary" }),
  {
    fontFamily: themeVars.font.family,
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
  },
]);
