import { themeVars } from "~/common";
import { style } from "@vanilla-extract/css";

export const BadgeStyle = style({
  backgroundColor: themeVars.color.secondary,
  color: themeVars.color.primary,
  fontFamily: themeVars.font.family,
});
