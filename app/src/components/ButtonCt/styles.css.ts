import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "~/common";

export const ButtonStyle = recipe({
  base: {
    fontFamily: themeVars.font.family,
    fontSize: themeVars.font.size.standard,
    color: themeVars.color.primary,
    paddingTop: "5px",
    paddingBottom: "5px",
    outline: "none",
    border: "none",
    borderRadius: 5,
    backgroundColor: "transparent",
    userSelect: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    textDecoration: "none",
    selectors: {
      "&:hover": {
        backgroundColor: themeVars.color.backgroundSecondary,
      },
      "&:disabled": {
        backgroundColor: themeVars.color.accent,
        color: themeVars.color.backgroundSecondary,
        cursor: "not-allowed",
      },
    },
  },
  variants: {
    size: {
      standard: {
        fontSize: themeVars.font.size.standard,
      },
      small: {
        fontSize: themeVars.font.size.small,
      },
      big: {
        fontSize: themeVars.font.size.large,
      },
    },
    border: {
      standard: {
        border: `1px solid ${themeVars.color.backgroundSecondary}`,
      },
      underline: {
        borderBottom: `1px solid ${themeVars.color.accent}`,
        borderBottomLeftRadius: "5px",
        borderBottomRightRadius: "5px",
      },
      none: {
        border: "none",
      },
    },
    selected: {
      true: {
        backgroundColor: themeVars.color.backgroundSecondary,
      },
    },
  },
  defaultVariants: {
    size: "standard",
    border: "standard",
  },
});
