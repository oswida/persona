import { themeVars } from "~/common";
import { style } from "@vanilla-extract/css";

export const MainStyle = style({
  width: "100vw",
  height: "100vh",
  overflow: "auto",
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
  width: "100%",
  height: "2em",
  padding: "5px 10px",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: themeVars.color.accent,
});

export const FooterStyle = style({
  display: "flex",
  position: "fixed",
  bottom: "0px",
  left: "0px",
  width: "100%",
  height: "2em",
  padding: "5px 10px",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: themeVars.color.accent,
});

export const MainContentStyle = style({
  marginTop: "2em",
  display: "flex",
  flexDirection: "column",
  padding: "5px",
});
