import { style } from "@vanilla-extract/css";
import { themeVars } from "~/common";

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
  backgroundColor: themeVars.color.backgroundSecondary,
  padding: "5px",
  borderRadius: "5px",
});
