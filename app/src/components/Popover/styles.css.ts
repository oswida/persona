import { style } from "@vanilla-extract/css";
import { themeVars } from "~/common";

export const PopoverRootStyle = style({
  backgroundColor: themeVars.colors.background100,
  color: themeVars.colors.fontPrimary,
  minWidth: "max-content",
  padding: "5px",
  border: `solid 1px ${themeVars.colors.background300}`,
  borderRadius: "5px",
});

export const PopoverPositionerStyle = style({
  backgroundColor: themeVars.colors.background100,
  color: themeVars.colors.fontPrimary,
  position: "absolute",
  zIndex: 500,
  marginTop: "5px",
});

export const PopoverTitleStyle = style({
  display: "flex",
  padding: "5px",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: `solid 1px ${themeVars.colors.background300}`,
  width: "100%",
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
  color: themeVars.colors.fontPrimary,
});

export const PopoverContentStyle = style({
  marginTop: "10px",
});
