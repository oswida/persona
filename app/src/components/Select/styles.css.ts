import { style } from "@vanilla-extract/css";
import { themeVars } from "~/common";

export const SelectRootStyle = style({
  backgroundColor: "transparent",
  color: themeVars.color.primary,
  width: "max-content",
});

export const SelectContentStyle = style({
  backgroundColor: themeVars.color.backgroundSecondary,
  color: themeVars.color.primary,
  border: "none",
  outline: "none",
  borderRadius: "5px",
  paddingLeft: "0px",
});

export const SelectLabelStyle = style({
  color: themeVars.color.primary,
});

export const SelectTriggerStyle = style({
  backgroundColor: themeVars.color.backgroundSecondary,
  color: themeVars.color.primary,
  display: "flex",
  flexDirection: "row",
  padding: "2px 10px",
  justifyContent: "space-between",
  border: "none",
  borderRadius: "5px",
  alignItems: "center",
  gap: "10px",
  outline: "none",
  userSelect: "none",
  fontSize: themeVars.font.size.standard,
  fontFamily: themeVars.font.family,
});

export const SelectItemStyle = style({
  border: "none",
  outline: "none",
  userSelect: "none",
  padding: "5px 10px",
  listStyle: "none",
  display: "flex",
  gap: "10px",
  borderRadius: "5px",
  justifyContent: "space-between",
  selectors: {
    "&:hover": {
      backgroundColor: themeVars.color.accent,
    },
  },
});
