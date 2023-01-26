import { style } from "@vanilla-extract/css";
import { themeVars } from "~/common";

// This is portalled so we have to use runtime colors

export const PopoverRootStyle = style({
  backgroundColor: themeVars.color.accent,
  color: themeVars.color.primary,
  fontFamily: themeVars.font.family,
  fontSize: themeVars.font.size.standard,
});

export const PopoverTitleStyle = style({
  display: "flex",
  padding: "5px",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  fontSize: themeVars.font.size.standard,
  marginTop: "5px",
  marginBottom: "5px",
  color: themeVars.color.primary,
});

export const PopoverCloseButtonStyle = style({
  border: "none",
  outline: "none",
  height: 30 * 0.8,
  width: 30,
  fontSize: 20,
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  userSelect: "none",
  backgroundColor: "transparent",
  color: themeVars.color.primary,
  alignSelf: "flex-end",
});

export const PopoverContentStyle = style({
  backgroundColor: themeVars.color.accent,
  padding: "5px",
  borderRadius: "5px",
});
