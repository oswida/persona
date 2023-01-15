import { themeVars } from "~/common";
import { style } from "@vanilla-extract/css";

export const TplPageStyle = style({
  width: "100%",
});

export const TpleHeaderStyle = style({
  fontSize: themeVars.font.size.bigger,
  color: themeVars.color.secondary,
});

export const TpleHelpStyle = style({
  fontSize: themeVars.font.size.small,
  color: themeVars.color.secondary,
});
