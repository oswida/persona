import { globalStyle, style } from "@vanilla-extract/css";
import { themeVars } from "./common";

globalStyle("html, body", {
  margin: 0,
  padding: 0,
});

globalStyle("*, *:before, *:after", {
  boxSizing: "border-box",
});

export const appStyle = style({
  backgroundColor: themeVars.color.background,
  color: themeVars.color.primary,
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
});
