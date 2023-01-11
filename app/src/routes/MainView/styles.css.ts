import { themeVars } from "~/common";
import { style } from "@vanilla-extract/css";

export const MainStyle = style({
  width: "100vw",
  height: "100vh",
  overflow: "auto",
  padding: "5px",
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.size.standard,
  backgroundColor: themeVars.color.background,
  color: themeVars.color.primary,
});

export const TopBarStyle = style({
  display: "flex",
  position: "fixed",
  top: "0px",
  left: "0px",
  width: "100vw",
  height: "2em",
  padding: "5px 10px",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: themeVars.color.accent,
});
