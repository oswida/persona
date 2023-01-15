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
  fontSize: themeVars.font.size.small,
  color: themeVars.color.secondary,
});

export const TpleSectionStyle = style({
  fontSize: themeVars.font.size.bigger,
  backgroundColor: themeVars.color.backgroundSecondary,
  color: themeVars.color.primary,
  padding: "5px 10px",
  borderBottom: `1px solid ${themeVars.color.secondary}`,
});

export const TplTextStyle = style({
  display: "flex",
});

export const TplNumericStyle = recipe({
  base: {
    width: "2.5rem",
    height: "2.5rem",
    padding: "0.1rem",
    backgroundColor: themeVars.color.background,
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.size.standard,
    color: themeVars.color.primary,
    textAlign: "center",
    verticalAlign: "middle",
    outline: "none",
  },
  variants: {
    decoration: {
      circle: {
        border: `1px solid ${themeVars.color.primary}`,
        borderRadius: "50%",
      },
      square: {
        border: `1px solid ${themeVars.color.primary}`,
        borderRadius: "10px",
      },
      underline: {
        border: "none",
        borderBottom: `1px solid ${themeVars.color.primary}`,
      },
      none: {
        border: "none",
      },
    },
  },
});

export const TplSlashStyle = style({
  height: "2.5rem",
  width: "0.5rem",
  background: `linear-gradient(to top left,
    ${themeVars.color.background} 0%,
    ${themeVars.color.background} calc(50% - 2px),
             ${themeVars.color.primary} 50%,
             ${themeVars.color.background} calc(50% + 2px),
             ${themeVars.color.background} 100%),
              linear-gradient(to top right,
                ${themeVars.color.background} 0%,
                ${themeVars.color.background} calc(50% - 2px),
             ${themeVars.color.primary} 50%,
             ${themeVars.color.background} calc(50% + 2px),
             ${themeVars.color.background} 100%)`,
});
