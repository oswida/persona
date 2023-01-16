import { recipe } from "@vanilla-extract/recipes";
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
  fontSize: themeVars.font.size.xsmall,
  color: themeVars.color.secondary,
});

export const TpleSectionStyle = style({
  fontSize: themeVars.font.size.bigger,
  backgroundColor: themeVars.color.backgroundSecondary,
  color: themeVars.color.primary,
  padding: "5px 10px",
  borderBottom: `1px solid ${themeVars.color.secondary}`,
});
