import { themeVars } from "~/common";
import { style } from "@vanilla-extract/css";

export const SelectRootStyle = style({
  backgroundColor: themeVars.color.backgroundSecondary,
  color: themeVars.color.primary,
});

export const SelectTriggerStyle = style({
  backgroundColor: themeVars.color.backgroundSecondary,
  color: themeVars.color.primary,
  display: "flex",
  flexDirection: "row",
  padding: "5px 10px",
  justifyContent: "space-between",
  border: "none",
  borderRadius: "5px",
  alignItems: "center",
  gap: "10px",
  outline: "none",
});
