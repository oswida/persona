import { themeVars } from "~/common";
import { currentTheme } from "~/common";
import { style } from "@vanilla-extract/css";

// This is portalled so we have to use runtime colors

export const PopoverRootStyle = style({
  fontFamily: themeVars.font.family,
  backgroundColor: themeVars.color.backgroundLight,
  color: themeVars.color.primary,
  minWidth: "max-content",
  padding: "5px",
  border: `solid 1px ${themeVars.color.secondary}`,
  borderRadius: "5px",
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
});

export const PopoverContentStyle = style({
  marginTop: "5px",
  marginBottom: "5px",
});
